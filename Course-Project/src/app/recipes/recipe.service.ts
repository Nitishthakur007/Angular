import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";


@Injectable()
export class RecipeService{

   constructor(private shoppingListService: ShoppingListService){}
   

   // recipeSelected = new EventEmitter<Recipe>;
    //recipeSelected = new Subject<Recipe>;

    private recipesList: Recipe[] = [
        new Recipe('Prawn Pasta',
        'Garlic and lemon prawn pasta recipe',
        'https://img.taste.com.au/mOx3fOxf/w720-h480-cfill-q80/taste/2022/09/garlic-chilli-prawn-pasta-181440-1.jpg',
        [new Ingredient('prawns', 10),
        new Ingredient('pasta', 1),
        new Ingredient('lemon', 1),
        new Ingredient('Beans', 20) ,
      new Ingredient('Garlic',1)]),
        new Recipe('Chicken Pot',
        'One Pot Paprika Chicken Recipe',
        'https://glutenfreecuppatea.co.uk/wp-content/uploads/2022/01/gluten-free-smoky-paprika-chicken-recipe-2.jpg',
        [new Ingredient('Chicken', 5),
        new Ingredient('Tomatos', 3)
         ]),
         new Recipe('Butter chicken', 
         'Butter chicken with basmati rice',
        'https://niksharmacooks.com/wp-content/uploads/2022/11/ButterChickenDSC_5616.jpg',
        [new Ingredient('chicken', 10),
        new Ingredient('rice', 1),
        new Ingredient('cream', 1),
        new Ingredient('parsly', 10) ]),
        new Recipe('Laal Maas', 
        'Rajasthani goat curry',
         'https://media.vogue.in/wp-content/uploads/2020/09/Lal-Maas-1135-AD.jpg',
         [new Ingredient('goat meat', 10),
         new Ingredient('chillies', 5),
         new Ingredient('Onion', 3),
         new Ingredient('tomatoes', 5) ])
      ];
     
     getRecipes(){
        return this.recipesList.slice();
     }

     getRecipe(index: number){
         return this.recipesList[index];
     }

     addIngToShopList(ingredients: Ingredient[]){
      this.shoppingListService.addIgredients(ingredients);
     }
}