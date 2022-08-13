// in mongoose some validation are built in and you create other custom avlidations as well and with some async validations as well
// but mongoose validation is still kind of basic and not much usefull for full validation usecase because it works well for creation of doc but it is complicated to implimante for updation of doc there it not work very well
// so we can use mongoose validation if we want but for basic senario if your app will need any kind of good validation currently or in futuer then it's best to use some request body validator packages from the community because it works for all senarios also it provide sepration for models and validation relation logic and it can be usefull inspite of any of database where this mongoose will only work for mongoose package.

// by the way every validation is kind of per save hook in mongoose so it will work before saving.

// also keep in mind before running validations the mongoose run casting process which is to cast the data to it's appropriate data type so if mongoose fail to cast any of data it will not run validation it will return errors related to casting.

// in the value of field is undefined then any of validation will not run for that field except require validation.

// all types has require validator.
// number = min , max
// string = enum, match, minLength, maxLength

// eggs: {
//     type: Number,

// with this syntext we can define the value and custom message hare we can use {VALUE} which will be replaced by the actual value
//     min: [6, 'Must be at least 6, got {VALUE}'],
// we can also use this way hear mongoose will use it's own message
//     max: 12
//   },

// unique is not a validation of mongoose it's from mongoDB so for unique mongoose will not run any validation if unique validation will break then mongoDB will give error not the mongoose.

// we can define custom validators as well which are just functions which will return true of false at the end.

// age: {
//     type: Number,
//     validator : function(v) { return v > 18 }
// }

// age: {
//     type: Number,
// validate: {
//     validator: function(v) { return v > 18 },
//     message: props => `${props.value} in not greated then 18`
// }
// }

// we can do this 2 ways custom validation hare in first we just assign function to validator object. in seccond we need to pass msg as well so thats why we create validate key and in it we have validator function and message key as well.

// we can also do async validation hear promisses resolve value will be true or false.
// this validation will only pass when promis resolve with true if it's rejected or return false then it's fail. we can use same syntext above 2 ways just hare we pass promis

// age: {
//     type: Number,
//     validator : Promise.reject('err')
// }

// failed validation returns object which is type of ValidationError calss whic has all the data you needed for failed valdation.

// it is tricky to use validation on nested object so for that we have to create nested schima type and then it will work.

// it is also tricky to use validation for the update.

// so as discuss above this is just for very simple needs you can use some package like @hapi/joi or other well knone to implement the request body validation.
