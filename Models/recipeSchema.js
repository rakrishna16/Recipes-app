import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
    name : String,
    incredients : [],
    description:String,
    duration:Number
})

const recipes = mongoose.model("recipe",recipeSchema)

export default recipes;