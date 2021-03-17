import { Component, OnInit } from "@angular/core";
import { RecipeComponent } from "../../components/recipe/full/recipe.component";
import { Recipe } from "../../components/interfaces/Recipe";
import { RecipeService } from "../../components/services/recipe.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
    selector: 'app-main',
    template: require('./main.page.html'),
    styles: [require('./main.page.scss')],
})
export class MainPage implements OnInit {
    recipes: Recipe[] = [];

    recipesShown: number = 3;

    private modalRef?: BsModalRef;

    static parameters = [RecipeService, BsModalService];
    constructor(private recipeService: RecipeService, private modalService: BsModalService) {
        this.recipeService.getAllRecipes().then(recipes => {
            this.recipes = recipes;
        })
    }

    ngOnInit() {
    }

    showRecipeModal(recipe: Recipe) {
        const initialState = {
            editable: false,
            recipe: recipe
        };

        this.modalRef = this.modalService.show(RecipeComponent, {initialState, class: 'modal-lg'});
        this.modalRef.content.recipeEvent.subscribe(recipeEvent => {
            if(recipeEvent.type == 'delete') {
                this.recipes.splice(this.recipes.indexOf(recipe), 1);
                this.recipeService.deleteRecipe(recipeEvent.value);
            } else if(recipeEvent.type == 'change') {
                this.recipes.splice(this.recipes.indexOf(recipe), 1, recipeEvent.value);
                this.recipeService.updateRecipe(recipeEvent.value);
            } else {
                console.error("could not interpret event: " + JSON.stringify(recipeEvent));
            }

        });
    }
}
