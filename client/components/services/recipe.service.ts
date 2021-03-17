import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Recipe} from "../interfaces/Recipe";

@Injectable()
export class RecipeService {
    static parameters = [HttpClient];
    constructor(private httpClient: HttpClient) {
        this.httpClient = httpClient;
    }
    getAllRecipes(): Promise<Recipe[]> {
        return this.httpClient
            .get<Recipe[]>('/api/recipes')
            .toPromise();
    }

    updateRecipe(recipe: Recipe): Promise<Recipe> {
        return this.httpClient
            .put<Recipe>(`/api/recipes/${recipe._id}`, recipe)
            .toPromise();
    }

    createRecipe(recipe: Recipe): Promise<Recipe> {
        return new Promise<Recipe>((resolve, reject) => {
            this.httpClient
            .post<Recipe>(`/api/recipes`, recipe)
            .toPromise().then(createdRecipe => {
                recipe._id = createdRecipe._id;
                resolve(recipe);
            });
        });
    }

    deleteRecipe(recipe: Recipe): Promise<void> {
        return this.httpClient
            .delete<void>(`/api/recipes/${recipe._id}`)
            .toPromise();
    }
}
