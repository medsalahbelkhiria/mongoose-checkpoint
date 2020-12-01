  
const mongoose = require('mongoose');

//Connect to the database

mongoose.connect('mongodb://localhost:27017/personsDB', { useNewUrlParser: true, useUnifiedTopology: true });

//schema

const personSchema = new mongoose.Schema({
    name : {type :String,
    required:[true, 'Please check your data entry, no name specified!']},
    age : Number,
    favoriteFoods : [{type: String}]
})

//Creating the Document

const Person = mongoose.model("Person", personSchema)


const person = new Person ({
  name : 'Sam',
  age : 23,
  favoriteFoods : ['HAmburger', 'Rice', 'Paella', 'Tacos']  
})

//Saving document with calback function

person.save(function(err, data){
if(err) {
    console.log(err);
} else {
    console.log(data);
}
})

//Passing data in the arrayOfPeople database

const arrayOfPeople=[
    {name: "James" , age: 22 , favoriteFoods: ["Hamburger", "Chiken", "Fish"]} ,
    {name: "Fares" , age: 35 , favoriteFoods: ["Salad", "Pizza", "Meat"]} ,
    {name: "Said" , age: 33 , favoriteFoods: ["Spaghetti", "Rice", "Burrito"]} ,
    {name: "Khalil" , age: 76 , favoriteFoods: ["Cake", "Burrito", "Rice"]} ,
    {name: "Salah" , age: 26 , favoriteFoods: ["Cake", "Choclate", "Chips"]} ,
    {name: "Mehdi" , age: 19 , favoriteFoods: ["Hamburger", "Burrito", "Meat"]}]

//adding the data in mongodb

    const createManyPeople = (arrayOfPeople, done) => {
        Person.create(arrayOfPeople, (err, data) => {
          if (err) return done(err);
          return done(null, data);
        });
      };
      createManyPeople()

      
// Searching person with specific name Fares and shows his data

Person.find({name: "Fares"}, (err, data)=>{
    if (err) {
        console.log(err);
    } else {
        console.log('the first person found with name Fares' + data)
    }
} )

//Finding person who likes a specific food "example: Cake, Burrito and Rice"

Person.findOne({favoriteFoods: [ "Cake", "Burrito", "Rice"]}, (err, data)=>{
    if (err) {
        console.log(err);
    } else {
        console.log('The first person Who likes Cake,Burrito and Rice is' + data)
    }
} )

//Searching person by a specific given id 5f7dff68cffe3d4a3c0f7a58

Person.findById("5f7dff68cffe3d4a3c0f7a58", (err, data)=>{
    if (err) {
        console.log(err);
    } else {
        console.log('the  person With the id 5f7dff68cffe3d4a3c0f7a58' + data)
    }
})

//Searching person by a specific given id 5f7dff68cffe3d4a3c0f7a58 and edit and save his favoriteFoods "example: add "Cheese""

Person.findById("5f7dff68cffe3d4a3c0f7a58", (err, data)=>{
    if (err) {
        console.log(err);
    } else {
        data.favoriteFoods.push("Cheese")
        data.save()
        console.log('The person With the id 5f7dff68cffe3d4a3c0f7a58 has been updated' + data)
    }
})

// Finding a person with a specific name "exemple: Fares" and updating his age to 20

Person.findOneAndUpdate({name:'Fares'}, {age: 24}, { new: true }, (err, data)=>{
    if (err) {
        console.log(err);
    } else {
        
        console.log('the  person With the name Fares and setting his age to 24' + data)
    }
})


// finding a person with a specific id exp 5f7dff68cffe3d4a3c0f7a58 and deleting it

Person.findByIdAndRemove("5f7dff68cffe3d4a3c0f7a58", (err, data)=>{
    if (err) {
        console.log(err);
    } else {
        
        console.log('the  person With the id 5f7dff68cffe3d4a3c0f7a58 and deleting it' + data)
    }
})

//Deleting all persons with the name "Said"

Person.deleteMany({name: 'Said'}, (err, data)=>{
    if (err) {
        console.log(err);
    } else {
        
        done(null, data)
    }
})

//Find people who like Burrito. Sort them by name, limit the results to two documents, and hide their age

Person.find({favoriteFoods: { $all : ["Burrito"]}}).sort({'name':1}).limit(2).select('name favoriteFoods').exec((error,data)=>{
    if (error){console.log(error)}
    else {
      console.log("Two People  like burrito "+data); }})