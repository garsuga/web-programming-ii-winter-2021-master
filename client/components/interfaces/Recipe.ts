import { Ingredient } from "./Ingredient";
import { Review } from "./Review";

export class Recipe {
    _id: string;
    name: string;
    description: string;
    image: string;
    prepTime: number;
    cookTime: number;
    directions: string[];
    ingredients: Ingredient[];
    reviews: Review[];
}

export function cloneRecipe(recipe: Recipe): Recipe {
    // shallow copy of recipe
    let c = {...recipe} as Recipe;

    // shallow copy of directions,
    // strings are immutable
    c.directions = [...c.directions];

    // deep copy of ingredients
    // they are mutable, their members are immutable
    c.ingredients = []
    for(let i of recipe.ingredients) {
        c.ingredients.push({...i});
    }

    // shallow copy of reviews
    // cannot edit reviews as part of recipe, can only change
    // ids in array
    c.reviews = [...c.reviews];

    return c;
}
