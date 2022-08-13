// 1) schima() = use to create schima accept 2 params first is fields object 2 is options

// ex 

const user = new Schima({
    name: String,
    password: String
},
{
    timestamps: true,
    toJson: {virtual: true}
})


// 2) Schima.Types = its collection of diffrent schima types used to assign diffrent schima

const user2 = new Schima({
    name: String,
    drivingLicence: {type: Schima.Types.ObjectId, ref:'drivingLicence'},
    otherData: {type: Schima.Types.Mixed}
})


// 3) clone() = use to clone schima
const schemaOne = new Schema({ name: String });
const clone = schemaOne.clone();


// 4) method() = use to add methods on schima which we can use by the model instance

// example is in testModel.js where we define method in schima

// 5) query() = use to add query methods which are chainable whit the query object.
// it's used to define some logic which we want to use many times for model in querying.
// for example check query() methos in testModel.js

// 5) virtual() = use to set virtual populate path 

// most usefull in virtual populate.
// for ex take look at populate.js and relationshipAdvance.js for virtual populate.


// 6) virtuals() = use to set virtual getter and setter property on same models fields

// for example take a look at virtual property in testModel.js 