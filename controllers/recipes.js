
const Recipe = require('../models/Recipe')
module.exports = {
    getRecipes: async (req,res)=>{
       
        console.log(req.user)
        try{
            const recipeNames = await Recipe.find({userId:req.user.id})
            const recipesCount = await Recipe.countDocuments({userId:req.user.id})
            res.render('recipe.ejs', {recipes: recipeNames, count: recipesCount, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
 
    createRecipe: async (req, res)=>{
        try{
            await Recipe.create({recipeName: req.body.recipeName, userId: req.user.id})
            console.log('Todo has been added!')
            res.redirect('/recipes')
        }catch(err){
            console.log(err)
        }
    },

    deleteRecipe: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Recipe.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },

    getSortedRecipe: async (req,res) =>{  //added new async funtion to try to sort the recipe A-Z Please take a look at this!!!  havent tested yet
        try{
            const sortedRecipe = await Recipe.find({userId:req.user.id}).sort({recipeName:1})
            const recipesCount = await Recipe.countDocuments({userId:req.user.id})
            res.render('recipe.ejs',{recipes: sortedRecipe, count:recipesCount, user: req.user})
        }catch(err){
            console.log(err)
        }
    }
}    