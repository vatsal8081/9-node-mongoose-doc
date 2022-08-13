// when it comes to mongodb there is really no any fixed concept of relationship between 2 clolections


// in mongodb we can define the relationship in n number of ways the basic rule of defining
// relationship in mongodb is you should define relationship in a way that it makes easy 
// to you to manage and get data from that realtionship.

// so thats why we have many ways with which we can define relationship and work with data 
// which are provided by mongodb, mongoose, prisma, community etc. 
// so lets first understand sql relationship and then ways we have in nosql to achive
// relationship and which way to use in which senario.



// SQL :::::

// one to one

// user {
//     id
// }

// drivingLicence {
//     id,
//     userId
// }


// one to many

// user {
//     id
// }


// car {
//     id,
//     userId
// }


// many to many

// post {
//     id
// }

// tag {
//     id
// }

// postTag {
//     postId,
//     tagId
// }



// you can see in sql we have this 3 kind of basic relationships and to manage something
// simmular lets understand what we can do in mongodb.



// mongoDB :::::::

// some ways which we can use you define relationship in mongoDB

// 1) embeded doc way in mongodb
// 2) using lookup aggrigation stage in mongodb
// 3) storing objectId and using ref and populate in mongoose with 2  refs
// 4) storing objectId and using ref and populate in mongoose with single ref and virtual populate
// 5) single way ref in presma of semething else

// first of all just clear this one thing in your mind that in mongoDB there is no way 
// with which we can define pure relatioship the way we do in the sql.

// weather you do embeded way of doc, lookup, mongoose 2 or 1 ref or semething else in sql 
// if you try to add any child with invalid parent id, delete parent then it will delete all childs 
// automatically update hear sql will manage all the relation by it self but in mongodb its
// your responsibality to manage all the relations by your own for ex if you try to add 
// any car with invalid user id which don't exist it will not give err, if you delete a user
// it's your responsiblity to delete the cars related to him etc and many more which we will
// see in every way we can define in relation.

// also when youn do ref and store objectId in actual mongodb it's just the string for
// mongodb he even don't know this id is related to any other collection of it's valid or not
// it's the magic of ODM you are using like mongoose and presma which gives you ablity to 
// provide relation between data and get it way you want still it's your job to keep that 
// relation updated on every porations by deleting or updating relation collectins data as we 
// described above.

// we will not look in to mongodb embeded doc and lookup ( 1) 2) ) because it's already we know
// lets findout other ways we have


// ::::::::::::::::::::::::::::::

// 3) storing objectId and using ref and populate in mongoose with 2  refs


// in mongoose we have one special data type cald objectId which is unique id just like _id

// what we can do is in any table we can use this type and provide ref of other collection
// and we store {} or [] of objectId in that ref now we cau use populate and give that path 
// what mongoose will do is it will get that objectId and find it in ref table _id and get and
// combine that data and give it to you

// so to mange this way of getting data we need objectId in parent and child both table 
// unlike in sql where we just add it in the child table.

// ex

// one to one ::

// user {
//     _id,
//     drivingLicence: {type: Schima.Types.objectId, ref: 'drivingLicence'}
// }

// drivingLicence {
//     id,
//     user: {type: Schima.types.objectId, ref:'user'}
// }

// this way when we add user we have to add its drivingLicence id and when we add drivingLicence id
// we have to add user id 
// just keep in mind where we don't have ref we cannot get it's related data from that collection

// for example if we don't have user in drivingLincence collection we cannote populate 
// drivingLicence with it's user because populate just need some id which we can chech and 
// can get data of it from other tabel.

// one to many ::

// same rule applay to the one to many relation just hear parent will have multiple childs 
// we have to mange array of childs in parent

// user {
//     _id,
//     cars: [{type: Schema.Types.ObjectId, ref: 'car'}]
// }

// car {
//     _id,
//     user: {type: Schema.Types.ObjectId, ref:'user'}
// }

// hear it's little bit more trecky because we have to manage array in parent so for ex
// we add new car then we have to add it's user id in cars collection and push car id to cars
// array in user to be able to get ablity to populate data from both ways.
// when we delete car we have to delete it's id from user cars array as well
// we delete user then we fiest have to delete cars of user then user

// and all this we have to manage by our self to manage relationship from 2 ways.


// many to many ::

// post {
//     _id,
//     tags: [{type: Schima.Types.ObjectId, ref:'tag'}]
// }


// tag {
//     _id,
//     users: [{type: Schima.Types.ObjectId, ref:'post'}]
// }


// hear situation get even worst we have to manage arrays in both collection on every opration


// also it's your choice if you want to manage refs in only one collection if your plan is to
// get data from one side only it's also possible but it's good practive to define the 
// relation and manage it from both ways so in future if you need to get data from other side
// it will be also possibel.


// 4) storing objectId and using ref and populate in mongoose with single ref and virtual populate :::

// you saw it's very deficult to manage relation from both side and it's not also like sql

// in way 3) we have more work to do to achive same thing like sql and also storing array 
// of ids or childs are not good practic because when you app will scale we will have 
// very large amount of childs so array of parent will be out of limit very soon.

// so to resolve this in mongoose we have way cald virtual populate which helps us
// do remove all this problems and make our work easy of manage ref only in child just like sql

// for that we manage ref in child just like in 3) and in parent we create virtual
// populate propert which is just like look up and it save su to manage relation in parent.

// one to one ::

// user {
//     _id
// }

// user.virtual('drivingLicence', {
//     ref: 'drivingLicence',
//     localField: "_id",
//     foreignField: "user"
// })

// hear the first param in virual is path name you want 
// (key name just like we used to define onjectId field)
// in seccond ref is collection name we want to ref (same ref in 3) objectId field)
// local field in field which we use to compair against other collection
// foreign field is feild with which we should compair local field
// in short this will get _id and get record or records which have same _id value in drivingLicence user key

// also don't forgot to use 
//     toJSON: { virtuals: true }
//   toObject: { virtuals: true }
// to schima option of parent so we can get data of virtual field in object and json conversion

// and drivingLicnce collection will be same.

// drivingLicence {
//     id,
//     user: {type: Schima.types.objectId, ref:'user'}
// }

// with  this we just have to manage the relation in just one place like sql and it just 
// work same with populate no change thare.

// but still keep in mind we have to manage relation by our self still like 3) but it's 
// more easy now because we just have to manage 1 table relation.


// one to many ::

// this way is most usefull in the one to many way because it remove need of managing array
// in parent just need to manage {} in the child

// user {
//     _id
// }

// user.virtual('cars', {
//     ref: 'car',
//     localField: "_id",
//     foreignField: "user"
// })


// car {
//     _id,
//     user: {type: Schema.Types.ObjectId, ref:'user'}
// }

// just like sql


// many to many ::

// hear it's not tacnically possible to use virtual populate so we can use one other pyot 
// table if we want and can manage relationship because populate also support population 
// from array of ids of string or we can use 2 way array methos


// post {
//     _id
// }

// tag {
//     _id
// }

// postTag {
//     postId: {type: Schema.Types.ObjectId, ref:'post'},
//     tagId: {type: Schema.Types.ObjectId, ref:'tag'}
// }


// so as you saw there are really no any pre define way we can use relation in mongodb 
// it's base on our situation and need we can use any of above ways just try to use method
// 4 most of the time insted of any else because it's more easy scalabel way.