import { Component, Input } from "@angular/core";
import { Recipe } from "../../interfaces/Recipe";

@Component({
    selector: 'recipe-card',
    template: require('./recipecard.component.html'),
    styles: [require('./recipecard.component.scss')],
})
export class RecipeCardComponent {
    @Input()
    recipe: Recipe

    constructor() {
    }
}
