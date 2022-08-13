// NOTE: there are many functions which we can use from model for same task like for find we 
// have find(), findById() for delete we have deleteOne(), findByIdAndDelete, findOneAndDelete()
// and like this for same kind of poerations we have many diffrent functions so it's 
// good to stick with functions which are of mongodb and also provided in mongoose 
// so we don't forgot mongodb and it make app more consistent and use those other functions
// only when we really need them on special cases. so try to use insertOne, updateOne, deleteOne, find etc more




// 1) model = use to create model out of schima

// const user = model('User', schimaObject)


// 2) model.aggrigate() = just like aggrigate function in mongodb no change
// this aggrigate will return the plain js object insted of document object like in other methods.

await User.aggrigate({
    $match: {age: {$gt: 20}}
})


// 3) we have bulkSave and bulkWrite like in mongodb

// 4) countDocuments() = just work like count in mongoDb 

await Adventure.countDocuments({ type: 'jungle' })


// mongoose own crud functions :::

// 5) create = use to insert one or many data
await Character.create({ name: 'Jean-Luc Picard' });
await Character.create([{ name: 'Will Riker' }, { name: 'Geordi LaForge' }]);

// 6) update = depricated dont use it.

// 7) save = most usefull for saving and updating.
const product = new Product()
product.name = 'abc'
product.price = 20
await product.save()

const oneProduct = Product.find({_id: '123'})
oneProduct.price = 30
await oneProduct.save() 



// mongoose mongoDB kind crud Functions :::

// there is notthing cald insertOne in mongoose you have use create or save

// 8) insertMany = just like mongodb use to insert many documents
await Movies.insertMany(arr);

// 9) updateOne = update first document satisfy condation 
// it will update only one document and only fields which you provided don't touch other 
// first argument will be match condation seccond will be update obj 3 optional is options

await User.updateOne({_id: '123'}, {name: 'vatsal', age: 24})


// 10) updateMany = same as update but it will update all the documents match to condation
// where update only update first auccor match.

await User.updateOne({name: 'vp'}, {name: 'vatsal', age: 24})

// there is notthing cald replaceMany in mongoose

// 11) replaceOne = just like update but it will replace whole document.

await User.replaceOne({_id: '123'}, {name: 'vatsal', age: 25, hobby: ['sports', 'trave'] })


// 12) deleteOne = delete first matche condation doc.

await User.deleteOne({_id: '123'})

// 13) deleteMany = just like deleteOne but delete all the documents that match condation

await User.deleteMany({name: 'vp'})


// 14) find = find is just like find in mongodb but with some advantages 

// in find firt argument is query just like mongodb 
// seccond argument is projection which can be 'name -age', {name: 1, age: -1}, {name: true, age: false}
// unlike mongodb projection it also support string but try to use obj most
// third argument can be option like skip sort but use mongodb like syntext insted like find().skip(2)



// find utlity functions :::

// now in mongoose there are some find functions for various use. they work as thair name
// suggest we can use those functions in many usefull senarios you can check doc for them 
// in api dock hear is the list.

// findById(), findByIdAndDelete(), findByIdAndRemove(), findByIdAndUpdate(), findOne()
// findOneAndDelete(), findOneAndRemove(), findOneAndReplace(), findOneAndUpdate()


// 15) distinct = return distinct data.
// arguments are field name, filter condation
await User.distinct('name', {age: {$gt: 18}})


// 16) model.event = event emitter usefull to listern model related events

MyModel.events.on('error', err => console.log(`err in model ${err}`))






