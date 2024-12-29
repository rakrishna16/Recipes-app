import express from "express";
import {
  createRecipies,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
} from "../Controllers/recipeController.js";

const router = express.Router();

// router.get("/getdata", getRecepies);
router.post("/create", createRecipies);
router.get("/getdata", getAllRecipes);
router.get("/getdata/:id", getRecipeById);
router.put("/update/:id", updateRecipe);
router.delete("/delete/:id", deleteRecipe);

export default router;
