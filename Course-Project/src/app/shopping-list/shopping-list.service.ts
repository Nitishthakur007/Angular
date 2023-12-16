
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService{
    //ingredientsChanged = new EventEmitter<Ingredient[]>();
    ingredientsChanged = new Subject<Ingredient[]>();
    startEditing = new Subject<number>();
   private ingredients : Ingredient[] = [
      ];

      getIngredients(){
        return this.ingredients.slice();
      }

      getIngredient(index:number){
        return this.ingredients[index];
      }

      addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
       // this.ingredientsChanged.emit(this.ingredients.slice()); // used with event emitter
        this.ingredientsChanged.next(this.ingredients.slice());    // used with Subject 
      }

      addIgredients(ingredients: Ingredient[]){
        // for (let ingredient of ingredients) {
        //   this.addIngredient(ingredient)
        // }
        this.ingredients.push(...ingredients);
        //this.ingredientsChanged.emit(this.ingredients.slice())
        this.ingredientsChanged.next(this.ingredients.slice())
      }

      updateIngredient(index:number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
      }
}