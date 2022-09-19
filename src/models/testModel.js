import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// 1
// we can create schima with help of schima object in mongoose which is notthing but just object with type of fields and extar info, also we can define some options per schima level in the other params of schima as well

const testSchima = new Schema({
  title: String,
  author: String,
  body: String,
  // 5
  // we can define index in any field with this way
  name: { type: String, index: true },
  comments: [{ body: String, date: Date }],
  // 7
  // we can also alias any field name like this with this now the field name will be dob in the collection but in code the name will be dateOfBirth but alias is also kind of virtual property with get and set so the value which you will get in object or json convertion is depands base on schima options you define so it has possiblity base on schima potions that you will get dob or dateOfBirth in object of json response
  // so try to give alias only and ony if needed otherwise always avoid it.
  dob: { type: Date, alias: 'dateOfBirth' },
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },
});

// mosty supported data types are for schima field is
// String
// Number
// Date
// Buffer
// Boolean
// Mixed
// ObjectId
// Array
// Decimal128
// MapString

// 3
// instance methods are methods which we can create for every schima class and then we can use it to model isntance for which schima we created the instance method
// this are usefull to implement same and same kind of logic on schima.methods we can create new instance method just keep in mind all this method should not be a arrow function otherwise they will not have there own this. and all this schima methods should be registed before we create model out of the schima

testSchima.methods.findSimmular = function () {
  // hear model name is the name which we will give to create model out of schima and this is refering to current instance which we create from model
  return model('Test').find({ name: this.name });
};
// now we can use it like this
// const testOne = new Test({name: 'abc'})

// now testOne is instance of Test class so it will have findSimmular avalable
// testOne.findSimmular()

// keep in mind this instance method is just avalable on instance of the model in instence of query builder so you will not able to chain this with find() and other model query builder methods.

// 4
// query helper is other type of methods which are just like instance method but it is chainable so we can chain it with other query functions to create querys and logic which we use repetativly
// we have to reguster it in schima.query

testSchima.query.byName = function (name) {
  return this.where({ name: name });
};

// and we can use it like this
// Test.find().byName('abc')

// 6
// we can also create virtual propertys for the schima. a virtyal property is extart field in the schima which is not actual part of schima but it will be there when we get data or send data or set data.
// this propertys is usefull when we don't want to store that field in our collection but we want whenever we get or set data it should be there for that we can use this
// it's kind of extra field whic will be calculatiod base on some condation

// now we can greate virtual property for just get or for just set or for both
// - we define it for just get when we want to calculate extra field when we get data only
// - we define it for just set base when base on some field which we will get as object when we try to save or update we want to calculate other field which is part of our collection and assign value to it. in short the field which is part of collection it's value will not given in save time we pass object it will calculate hear.
// - we define it as get and set base when we want both of above.

testSchima.virtual('acpectRatio').get(function () {
  return this.width / this.height;
});

testSchima.virtual('totalTagsCount').set(function () {
  return this.tags.length;
});

testSchima
  .virtual('fullName')
  .get(function () {
    return ` ${this.firstName} ${this.lastName} `;
  })
  .set(function (v) {
    this.firstName = v.split(' ')[0];
    this.lastName = v.split(' ')[1];
  });

// we have schima.virtual method which accept virtual property name and then we can chain get and set to it which accept function. in get we have to return calculated value and in set we will get value in params of set function so we just have to assign that base on calculation to actual field of collection where we want to assign it.

// all virtual propery set methods are run before validation so if you define any validation of any field which you using in setters and it is require still you will not get any err because we set data before the validation with set method and then validation applys.

// but that's not it we just define virtual property to get and set it we will need to define toJson() if we want this field to appear in response send by us or toObject() if we want to get it when we fire query and get data in options of the schima. you will learn this in schima option section bellow.

// 8
// schima options = there are to much schima options which we can use on seccond param of schima() method as object to configur our schima and model but hear we will just see some importent one you can visit doc for extar info.

// - collection = by defaylu mongoose create collection name base on the model name which we use to register the schima in it and it will create desharize and purlar name of that name but if you want to create diffrent name for collection name in mongoDB you can use this. you can pass  collection: '<name>' like this in options object in seccond param of schima function.

// - id = mongoose create virtual getter name as id in each document which is just value of _id in string. if you don't want it then you can desible it by giving id: false in option object.

// - _id =  mongoose assign _id field to each document and sub document as well if you don't want _id to created by mongoose then you can desibled it by _id : false
// but note that you can only create sub documents without _id if you want to create main doc then it should have _id in it so if you disable this then you have to assign _id by your self.

// - minimize = mongoose will not store any filed which has value {} so if you want to store a {} anyway then you can use minimize: false then it will store it as well and if we want to check that value of any field is {} then we can use $isEmpty helper of model which will return true or false base on value like this model.$isEmpty('field')

// - strict =  by default strict is set to true that mins when you try to store any value which are not part of model field it will not store. if you false it then when you pass any extra field which are not part of model field it will also store in document.

// - toJSON = we can define few options which we can do in every toJson call of document that mins every time when the object is parsed to json to send as response it is object which has getters : true / false and virtuals : true /  false to set if we want to include getters and virtual property or not.
// toJson : {getters: true, virtuals: false}

// - toObject = it's same as toJson jsut it will work on object conversion of model data. toObject : {getters: true, virtuals: false}

// - validateBeforeSave = every document is validated before saving in mongoDB wheather it has correct type and also it pass given validation if it fails data will not save and err will throw. we can desible this by passing validateBeforeSave : false

// - timestamps = it is object where we can set createdAt and updatedAt keys fields names also which fields are defined in it will be added in document as well
// timestamps : {createdAt: 'name we want for createdAt field', updatedAt: 'name we want for updatedAt field'}

// 2
// now after defining schima we have to convert it to model so we can use it for query and various perpouse for that we have model function in mongoose which accept name and schima object

const Test = model('Test', testSchima);

// 9
// schima Types
// we can define this many type of schimas in mongoose schima class for fields
// String
// Number
// Date
// Buffer
// Boolean
// Mixed
// ObjectId
// Array
// Decimal128
// Map
// Schema

// example

// const schema = new Schema({
//     name:    String,
//     binary:  Buffer,
//     living:  Boolean,
//     updated: { type: Date, default: Date.now },
//     age:     { type: Number, min: 18, max: 65 },
//     mixed:   Schema.Types.Mixed,
//     _someId: Schema.Types.ObjectId,
//     decimal: Schema.Types.Decimal128,
//     array: [],
//     ofString: [String],
//     ofNumber: [Number],
//     ofDates: [Date],
//     ofBuffer: [Buffer],
//     ofBoolean: [Boolean],
//     ofMixed: [Schema.Types.Mixed],
//     ofObjectId: [Schema.Types.ObjectId],
//     ofArrays: [[]],
//     ofArrayOfNumbers: [[Number]],
//     nested: {
//       stuff: { type: String, lowercase: true, trim: true }
//     },
//     map: Map,
//     mapOfString: {
//       type: Map,
//       of: String
//     }
//   })

// example use

// const Thing = mongoose.model('Thing', schema);

// const m = new Thing;
// m.name = 'Statue of Liberty';
// m.age = 125;
// m.updated = new Date;
// m.binary = Buffer.alloc(0);
// m.living = false;
// m.mixed = { any: { thing: 'i want' } };
// m.markModified('mixed');
// m._someId = new mongoose.Types.ObjectId;
// m.array.push(1);
// m.ofString.push("strings!");
// m.ofNumber.unshift(1,2,3,4);
// m.ofDates.addToSet(new Date);
// m.ofBuffer.pop();
// m.ofMixed = [1, [], 'three', { four: 5 }];
// m.nested.stuff = 'good';
// m.map = new Map([['key', 'value']]);
// m.save(callback);

// you can define filed type directly or if you want to add some extra options to field then you can provide the object where type key will be type of data you want to add and the other options can also be set

// in fields base on type of data you will have diffrent other options avalable but there are also some global options avalable which applays for all types

// required: boolean or function, if true adds a required validator for this property

// default: Any or function, sets a default value for the path. If the value is a function, the return value of the function is used as the default.

// select: boolean, specifies default projections for queries

// validate: function, adds a validator function for this property

// get: function, defines a custom getter for this property using Object.defineProperty().

// set: function, defines a custom setter for this property using Object.defineProperty().

// alias: string, mongoose >= 4.10.0 only. Defines a virtual with the given name that gets/sets this path.

// immutable: boolean, defines path as immutable. Mongoose prevents you from changing immutable paths unless the parent document has isNew: true.

// transform: function, Mongoose calls this function when you call Document#toJSON() function, including when you JSON.stringify() a document.

// index: boolean, whether to define an index on this property.

// unique: boolean, whether to define a unique index on this property.

// there are some data type related options as well

// String
// lowercase: boolean, whether to always call .toLowerCase() on the value
// uppercase: boolean, whether to always call .toUpperCase() on the value
// trim: boolean, whether to always call .trim() on the value
// match: RegExp, creates a validator that checks if the value matches the given regular expression
// enum: Array, creates a validator that checks if the value is in the given array.
// minLength: Number, creates a validator that checks if the value length is not less than the given number
// maxLength: Number, creates a validator that checks if the value length is not greater than the given number
// populate: Object, sets default populate options

// Number
// min: Number, creates a validator that checks if the value is greater than or equal to the given minimum.
// max: Number, creates a validator that checks if the value is less than or equal to the given maximum.
// enum: Array, creates a validator that checks if the value is strictly equal to one of the values in the given array.
// populate: Object, sets default populate options

// Date
// min: Date
// max: Date

// ObjectId
// populate: Object, sets default populate options

// there are some extra notes you should keep in mind when working with diffrent data properties

// String
// mongoose converts any data type to string which is successfully convertable to string like numbers

// Number
// mongoose will convert '15' = 15 , true = 1, false = 0

// Mixed are types in which you can store anything so try to use it very less and keep in mind in mixed any mongoose built in validation will not apply

// Boolean
// true , 'true', 1, '1' ,'yes' all this are true
// false, 'false', 0, '0', 'no' all this are false

// arrays
// - in array we can store array of any other data types

// now we will learn defineing type of field as Schima, array of schima, ObjectId, objectIds, array of ObjectId or objectIds and relations next.

// 10
// models
// when we create the model out of schima then we can use that model as representation of our collection in db
// so the created model will mave many methods which we can use like new Model create, save, create, update, delete etc.
// we will cover all this methods in breef when we will create cheet sheet from api

// 11
// documents
// when you get any data from the model instance with find, findOne etc the documents which you get are instence of mongoose document so you can do change in any field then call save(), can use some other avalable methods which we will create in cheet sheet as well.

// 12
// query
// in mongoose a query is special kind of object which is return by the mongoose model. a mongoose model has many heplers which returns query object. like find, finsById, delete, deleteMany etc.

// there are 2 ways whith which we can execute this query objects first is callback and seccond in by then or await.
// we will mostly use await syntext. await mode.find()

// this mongoose query objects can be built 2 ways in json way of in function chaining way.

// object way = model.find({age: {$gt: 17, $lt: 23}}).limit(10)

// function chain way = model.find().where('age').gt(17).lt(23).limit(10)

// this object way looks more like mongoDB query way and in the function chain way mongoose gives many functions which we can use to build whole query from model.

// and keep in mind that we do .then or await but still this quertes objects are not the promises so they will not return promise. they are mongoose query builder type but still we can use await or then because they are created that way that we can use like promis so it's easy to use for us but never ever mix the callback or then and await way of executing queries because if we pass callback to query and then we also do then so the query will eqecute 2 times and we will do same opration twice.
