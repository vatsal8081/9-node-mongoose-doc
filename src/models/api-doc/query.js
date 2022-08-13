// also in query objects there are some of the function same avalable which was there for 
// the model as well because some of the functions are avalable in and usable on both 
// model and the query object  so we will just list those functions

// also there are some utlity functions avalabale in the query object like where,
// and, gt, lt, nin, in etc which we can easily do in find query no need to learn 
// those extra functions and the extra syntext if we can easily do it with mongodb way

// so we will not list those functions as well if needed for specific senario you can visit
// api doc but good practic is to avoid those and use mongodb way insted.



// list on the methods also avalable in model
// countDocuments, deleteMany, deleteOne, distinct, find, findOne, findOneAndDelete, 
// findOneAndRemove, findOneAndReplace, findOneAndUpdate, replaceOne, update, updateMany, updateOne


// 1) exec = exec accept the callback and when we chain exec in any query mongoose
// execute the query it's alternative to await so use await most of the time it's just 
// for rare senarios.

// 2) lean = by using this mongoose will return plain js object insted of mongoose 
// document which it do for any query so js object will be very small in size so good
// when we no need of document instance and need js object and want to access very big data.

await User.find().lean()


// 3) limit = specifies number of document limit

await User.find().limit(50)


// 4) populate = use to populate path of ref

await User.findone().populate({path: 'cars'})
await User.findone().populate({path: 'cars', select: 'name model'})

await Car.find().populate({path: 'user'})

await User.find().populate({path: 'cars'}).populate({path: 'tiers'})

// 5) skip = use to skip document

await User.find().skip(50)

// 6) sort = use to sort document

await User.sort('name -age')
await User.sort({name: 'asc', age: -1})



// thats it mostly we have to use this much of query methods most because other are just
// function representation of mongodb query operators so if we can use $gt, $in, $nin 
// then why to use gt(), in(), nin() because directly using mongodb query operators 
// help to use mongodb more then mongoose so mostly use this query operators directly 
// insted of using chainable functions.


// also in document api i don't find anything which we will use in daily life
// so if you want just go through it and needed feel free to visit doc and find the neede thing 
// from document api and use it i am not creating it's doc. 

// and for aggrigate use native mongodb aggrigation insted of mongoose methods.