import { Schema, model } from 'mongoose';

const animalSchema = new Schema({
  name: { type: String, required: [true, "Animal name is required"] }, 
  age: { type: Number, required: [true, "Animal age is required"] }, 
  animalType: { type: String, required: [true, "Animal type is required"] }, 
});

animalSchema.methods.findSimilarTypes = function(cb) {
  return model('Animal').find({ animalType: this.type }, cb);
};

const Animal = model('Animal', animalSchema);


//method usage
const cat = Animal.findOne({ name: "Chichi"});
const similarType = cat.findSimilarTypes((error, types) => {
  console.log(types) //types is the result of the method 
});


