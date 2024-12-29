import recipes from "../Models/recipeSchema.js";

// const receipies = [
//     {"id": 1, "recepie":"Idly","incredients":["riceflour","salt","idlyvessel"],
//         "description":"need to grind the rice flower with water","duration":"30min"},
//         {"id": 2, "recepie":"Idly","incredients":["riceflour","salt","idlyvessel"],
//             "description":"need to grind the rice flower with water","duration":"30min"},
//             {"id": 3, "recepie":"Idly","incredients":["riceflour","salt","idlyvessel"],
//                 "description":"need to grind the rice flower with water","duration":"30min"},
//                 {"id": 4, "recepie":"Idly","incredients":["riceflour","salt","idlyvessel"],
//                     "description":"need to grind the rice flower with water","duration":"30min"},
//                     {"id": 5, "recepie":"Idly","incredients":["riceflour","salt","idlyvessel"],
//                         "description":"need to grind the rice flower with water","duration":"30min"}]

export const createRecipies = async (req, res) => {
  // res.status(200).json({message: "products retrived Successfully", data: receipies});
  try {
    const recipe = new recipes(req.body);
    await recipe.save();
    res
      .status(200)
      .json({ message: "Recipe added successfully", data: recipe });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Internal server error in creating recipes",
        data: error,
      });
  }
};

export const getAllRecipes = async (req, res) => {
  // res.status(200).json({message: "products retrived Successfully", data: });
  try {
    const getReceipe = await recipes.find();
    res
      .status(200)
      .json({ message: "Recipies retrived Successfully", data: getReceipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRecipeById = async (req, res) => {
  try {
    const getrecipeId = req.params.id;
    const recipe = await recipes.findById(getrecipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe Not Found" });
    }
    res
      .status(200)
      .json({ message: "Recipe retrieved successfully", data: recipe });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const { name, incredients, description, duration } = req.body;
    const result = await recipes.findByIdAndUpdate(
      { _id: recipeId },
      { name,incredients, description, duration },
      { new: true }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Recipe Not Found" });
    }
    res.status(200).json({ message: "Recipe Updated", data: result });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const result = await recipes.findByIdAndDelete({ _id: recipeId });
    if (!result) {
      return res.status(404).json({ message: "Recipe Not Found" });
    }
    const recipe = await recipes.find();
    res.status(200).json({ message: "Recipe deleted", data: recipe });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
