import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/User';
import { RecipeService } from '../../services/recipe.service';
import { cloneRecipe, Recipe } from '../../interfaces/Recipe';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RecipeComponent } from '../../recipe/full/recipe.component';

@Component({
    selector: 'recipes',
    template: require('./recipe.page.html'),
    styles: [require('./recipe.page.scss')],
})
export class RecipesPage implements OnInit {
    private recipes: Recipe[];
    private users: User[];

    private modalRef?: BsModalRef;

    static parameters = [UserService, RecipeService, BsModalService];
    constructor(
        private userService: UserService,
        private recipeService: RecipeService,
        private modalService: BsModalService) {
        userService.getAllUsers()
            .then(u => this.users = u)
            .catch(ex => console.log(ex));

        recipeService.getAllRecipes()
            .then(r => this.recipes = r)
            .catch(ex => console.log(ex));
    }

    ngOnInit() {
    }

    showRecipeModal(index: number, recipe: Recipe, state: any) {
        const initialState = {
            editable: true,
            recipe: recipe,
            ...state
        };

        this.modalRef = this.modalService.show(RecipeComponent, {initialState, class: 'modal-lg'});
        this.modalRef.content.recipeEvent.subscribe(recipeEvent => {
            if(recipeEvent.type == 'delete') {
                this.recipes.splice(index, 1);
                this.recipeService.deleteRecipe(recipeEvent.value);
            } else if(recipeEvent.type == 'change') {
                this.recipes.splice(index, 1, recipeEvent.value);
                this.recipeService.updateRecipe(recipeEvent.value);
            } else {
                console.error("could not interpret event: " + JSON.stringify(recipeEvent));
            }

        });
    }

    showNewRecipeModal() {
        const initialState = {
            editing: true
        };

        let recipe = {
            _id: undefined,
            name: "Placeholder",
            description: "Tastes incomplete.",
            image: "https://www.gaithersburgdental.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.png",
            prepTime: 0,
            cookTime: 0,
            directions: [
                "Example direction"
            ],
            ingredients: [{
                _id: undefined,
                name: "Some ingredient",
                amount: "1 cup"
            }],
            reviews: []
        };

        this.recipes.push(recipe);
        this.recipeService.createRecipe(recipe);

        this.showRecipeModal(this.recipes.length - 1, recipe, initialState);
    }
}
