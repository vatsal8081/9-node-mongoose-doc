// mongodb has $lookup in aggrigations which use to join base on multiple collections. but in
// mongoose we have more powerfull way to join multiple collections which is populate.

// a populate is way to automatically replase objectId refering to any other collections
// document with all its fields.

// lets define small relation between the tow collections and understand the populate

const personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }],
});

const storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
});

// we have above kind of structure where we will going to store objectIds of other collection
// which we will use in populate now lets understand populate

// saving :

// saving the data works same way we use simple save in mongoose

const author = new Persion({
  name: 'abc',
  age: 24,
});
await author.save();

const story1 = new Story({
  author: author._id,
  title: 'xyz',
});
await story1.save();

// populating :

// in populating we cald the foreign table field a path for example in story collection
// author and fans are path which point to any other collections documents.

// lets find one story and also populate the person who created it

await Story().findOne().populate({ path: 'author' });

// now hear we will get one story where we will have the author key which has one author
// who will be the all fields of that author document insted of just _id which we stored.

// now you can also populate after you got the documents from the collection also you
// can populate from the strings of ids.

// if you populate and there is no any record in the other collecton for that id then if
// it's single ref {} when you will get null in the populated key or it it's the array of
// ref then you will get []. for ex if we populate story.author then we will get null and
// if we populate story.fans we will get [] if there is no any matching doc avalable in
// other collection.

// you can also define which field you want to include of exclude whith select key where - is exculade.
await Story().findOne().populate({ path: 'author', select: 'name -age' });

// if you want to populate multiple paths of that same collection the you can chain the populate

await Story().findOne().populate({ path: 'autor' }).populate({ path: 'fans' });
// this will give you one story with it's author and array of all it's fans.

// in populate you can also give match condation so from all the documents which will be
// going to populate mongoose will finter the docs which will match condation

await Story()
  .findOne()
  .populate({
    path: 'fans',
    match: { age: { $gt: 20 } },
  });

// it will only give the fans whose age is gt 20.

// also you have the perDocumentLimit in populate to limit the number of returned documents
// of path

await Story().findOne().populate({
  path: 'fans',
  perDocumentLimit: 2,
});

// parent to child population :

// now in above example you saw that we was able to find story with it's author from
// clild to parent becasuse in clild (story) we are managing the ref for author but if
// you try to get all the stories from author it will be not possible right now
// because we are managing the stories ref in the author but still we did't store any story
// id in any author object. but we have stored author in story so that's why we was able to get
// story and it's author so to get the author and all it's story we also have to manage
// the stories array ref in the author as well.

// so now you can see hear that for conneting the parent and child docs we have to do it
// by our own in the mongodb and mongoose we will discuss it in more details letter but
// for now just keep in mind populate can only work we we can give him id or ids of
// other collection so for that we have to push every related stories of author in storys key
// in author object and add the author id in story.

// that mins we have to manage the relationship by our own by kipping the parent and child updated

await Person().find().populate({ path: 'storys' });

// NOTE : check Dynamic References via `refPath` in mongoose populate for advance senarios.

// populate virstals :

// as you notesed that in sql we just add the refrence in child table and we will be able to
// get data from child to parent and parent to cild as well but in mongodb we have to
// manage this reslation in both places we have to manage the ref {} in child and ref []
// in parent to achive this

// and suppose we have big app where we have to much stories by single single authors so
// for managing that every author will have a storis with very big arry which will be
// unmanagable at the end and store big space so really it's good to store the ref in just
// child and not good to store ref of [] of child in parent but if we don't do this
// we loose ablity to get authors with all it's stories because now we don't have stories
// [] in the parent.

// so to avoid this storing problem and achiving the both way relation with best practic
// we have virtual populate in this we define the relation just we did in sql like this

const personSchema2 = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
});

const storySchema2 = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
});

// hear you can see that we have the same structure which we follow in sql and it's also
// sclable and easy to use now we have avlity to get parent from child but to get childs from
// parent we have to define virtual property in parent schima like this

personSchema2.virtual('stories', {
  ref: 'Story', // collection name of child
  localField: '_id',
  fereignField: 'author',
});

// and we also have to add
//     toJSON: { virtuals: true }
//   toObject: { virtuals: true }

// in schima options of persion schima so we can get this virtual property every time in
// json of object conversion

// now you can see this is far more cleane easy way to manage the relations it's just like
// the loopup stage in mongodb aggregation now we just have to manage the reference in the
// child the way we define relation is changed but still way we use populate will saty same

// child to parent

await Story().find().populate({ path: 'persion' });

await Persion().find().populate({ path: 'stories' });
// hear from parent to child reference we are using the virtual populate named stories
// which will do all the magic for us. with this we are free form managing stories [] in
// parent on every add, update, delete, it's cleane and also works same way.

// and if we do just this await Persion().find() it will work without virtual property

// you just have to make sure when you do select in populate you always do select foreign key
// to make sure it work like

await Persion().find().populate({ path: 'stories', select: 'tilte, author' });
// hear author is must in select because our stories virtual populate relay on that.
