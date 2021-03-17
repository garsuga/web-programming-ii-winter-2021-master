import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { cloneReview, Review } from "../../interfaces/Review";
import { BsModalRef } from "ngx-bootstrap/modal";
import { cloneRecipe, Recipe } from "../../interfaces/Recipe";
import { ReviewService } from "../../services/review.service";

type UpdateEvent = {type: string, value: any}

@Component({
    selector: 'recipe',
    template: require('./recipe.component.html'),
    styles: [require('./recipe.component.scss')],
})
export class RecipeComponent implements OnInit {
    @Input()
    recipe: Recipe

    @Input()
    editable: boolean;

    _origRecipe: Recipe;

    @Output()
    recipeEvent: EventEmitter<UpdateEvent> = new EventEmitter();

    recipeSaveEvent: EventEmitter<Recipe> = new EventEmitter();

    editing: boolean = false;
    creatingReview: boolean = false;

    static parameters = [BsModalRef, ReviewService];
    constructor(public bsModalRef: BsModalRef, public reviewService: ReviewService) {}


    ngOnInit() {
        this._origRecipe = this.recipe;
        this.applyRecipeClone();
    }

    applyRecipeClone() {
        // clone the recipe in order to safeguard writes
        // will actually change the underlying recipe once the user confirms changes
        this.recipe = cloneRecipe(this._origRecipe);
    }

    acceptRecipe() {
        // this keeps things in order against multiple confirmed writes
        this._origRecipe = cloneRecipe(this.recipe);
    }

    makeCloneReview(review: Review): Review {
        let c = cloneReview(review);
        c._id = undefined;
        return c;
    }

    fixId() {
        this.recipe._id = this._origRecipe._id;
    }

    startEdit() {

    }

    acceptEdit() {
        this.fixId();
        this.recipe.prepTime = Math.round(this.recipe.prepTime);
        this.recipe.cookTime = Math.round(this.recipe.cookTime);
        this.recipeEvent.emit({type: 'change', value: this.recipe});
        this.acceptRecipe();
        this.recipeSaveEvent.emit(this.recipe);
    }

    rejectEdit() {
        this.applyRecipeClone();
    }

    deleteRecipe() {
        this.fixId();
        this.recipeEvent.emit({type: 'delete', value: this.recipe});
        this.bsModalRef.hide();
    }

    createReview(review: Review) {
        this.fixId();
        this.reviewService.createReview(this.recipe, review);
        this.recipe.reviews.push(review);
        this._origRecipe.reviews.push(review);
    }

    deleteReviewAt(index, review) {
        this.fixId();
        this.reviewService.deleteReview(this.recipe, review);
        this.recipe.reviews.splice(index, 1);
        this._origRecipe.reviews.splice(index, 1);
    }
}
