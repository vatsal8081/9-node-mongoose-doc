import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// there are monstly 3 kind of relationship which we can impleent in mongodb and for each type we have 2 ways to implement it

// 1> embedaded doc
// 2> refrence type

// 1> when we create embaded doc we store all related data of the entety in same entety it's easy to get related data with this way but hear it's not easy to add, delete, update the data and also it can have many duplicate data. so it's not ideal for storing large data and data which we change more and also we don't want data to duplicate, so only use this type for data which is not going to change more and also it will not incress in length more.

// 2> when we create refrence doc hear we store id of other related doc so hear we can easily add, update or delete and also hear data duplication will not there so most of the time use this type only.

// 1) embeded doc relationships

// - One To One

// - we can create one to one relation with just defineing field in the schima
// ex = user {
//     name: String,
//     age: Number,
//     dirvingLicence: {type: Object}
// }

// One To Many
// we can create one to many relationship just we did in one to one but hear we will store array of objects
// ex = blog {
//     title: String,
//     body: String,
//     comments: [{type: Object}]
// }

// Many to Many
// we can create many to many relation just by defining array of objects in both entites

// ex =
// Post {
//     title: String,
//     body: String,
//     tags: [{type: Object}]
// }

// tags {
//     name: String,
//     posts: [{type: Object}]
// }

// 2) refrence type relationships

// one to one
// implementing one to one relationship is easy in mongodb. we have objectId type in mongoose which represent the unique id in field when we create one field which will just store one unique object id then that mins we created one to one relation

// ex

const userSchima = new Schema({
  name: { type: String },
  age: { type: Number },
  drivingLincence: {
    type: Schema.Types.ObjectId,
    ref: 'DrivingLincence',
  },
});

const drivingLincenceSchima = new Schema({
  lincenceNumber: { type: String, unique: true },
  expiresAt: { type: Date },
});

// hear we created 2 collections and then we join them with creating one field in any one of them and that field will have single objectId and we give ref property where we will give name of collection where we want to connect it. this name is a name which we will use to register the drivingLicenceSchima to it's model mins when we will create model from dirvingLicenceSchima at that time first argument which we will pass that name is this.

// one to many
// implementing one to many relation is also easy and very very common in the mongoose. for creating this relationship we first create 2 schimas then we create one field which will have array of objectIds which represents the multiple connection of that record with other recorde in collection which has single representation

const blogSchima = new Schema({
  title: { type: String },
  body: { type: String },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

const commentSchima = new Schema({
  text: { type: String },
});

// hear as you can see for creating one to many relationship we have to create 2 models then we create one field which is array of objectIds in blog schima which will contain all the ids of comments which this post have.

// notice one thing hear in mongodb the one to many relationship is defined in oppositway then sql. in sql we create reference id in the many part of the table where it will refrence single id of one table like in sql we will create blogId refrence field in comments table which will be pointing to single blog but in mongoDb we create one field in one table which will contain array of objectIds of many table. so that's why we created comments key which is array of objectIds of comments in blog schima.

// many to many
// for many to many relation in mongodb we don't create new pyot table we just create array of objectIds fields which will have all the ids of other tab;e in both tables

const postSchima = new Schema({
  title: { type: String },
  body: { type: String },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
});

const tagSchima = new Schema({
  name: { type: String },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
});

// hear as you can see we are creating 2 way many to many refrence by just creating array of objectIds in both collection.

// it is ok to use embeded document type for the relationship where you are sure that it will always stays one to one in future as well. there you will achive all benifits of embeded documents. and for very specific senario where you will store array of data but you are sure it will not incress much in length.

// for all other senario it is recomended to use refrence type way.

// now keep one thing in mind that in actual mongoDb database there is notthing cald refrence to other document it only knows one way of storing data which is the embaded doc way.

// so taht mins in mongoose when we fire query to blog table and we will also get comments attached to it and we think it is related some how in mongoDb then it is wrong.

// for mongoDb the blog and comments both are seprate it just that in blog we are storing one comments field which will containg array of objectIds and those object ids are unique that's why we store them for decress duplication but thos are just unique ids for mongodb. mongodb don't know that this are ids of comment model so if you will store any id of user in comments object still mongodb will not complain because for it it's just ids no matter from which tabel.

// in actual mongodb if you create this knid of relationship there is nearly no way you can get blog whit all it's comments in single query and single response. you have to fire blig dfind query and then fire seprate query for get all comments which ids match to ids store in comments array of blog table.

// and belive me thats what the mongoose do behind the seens and thats why you get blog with comments in single query. we define ref property in comments key of the blog table it's for that. the ref key is used by mongoose internally it just used in mongoose not any use of it in mongoDB so base on that collection name of ref the mongoose get all data togather.

// so this way mongoose hepls us to actuly define relationship and work with it.

// now we also have to look that when we do find with populate mongoose gives all data whit it's refrence. so when we delete any post or any comment it also manage the related data to other tables or we have to do it by our self in one to one or one to many or in mamy to many relationships.


