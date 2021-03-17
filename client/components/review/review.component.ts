import { Component, Input, OnInit, EventEmitter } from "@angular/core";
import { Name } from "../interfaces/Name";
import { Recipe } from "../interfaces/Recipe";
import { cloneReview, Review } from "../interfaces/Review";
import { ReviewService } from "../services/review.service";

@Component({
    selector: 'review',
    template: require('./review.component.html'),
    styles: [require('./review.component.scss')],
})
export class ReviewComponent implements OnInit {
    @Input()
    review: Review;

    private _origReview: Review;

    @Input()
    recipeSaveEvent: EventEmitter<Recipe> = undefined;

    @Input()
    editing: boolean;

    static parameters = [ReviewService];
    constructor(private reviewService: ReviewService) {
    }

    nameToString(name: Name) : string {
        let nString = name.firstName;
        if(name.lastName) {
            nString += " " + name.lastName;
        }

        return nString;
    }

    hasChanged(): boolean {
        return this._origReview.description != this.review.description || this._origReview.rating != this.review.rating;
    }

    ngOnInit() {
        this._origReview = this.review;
        this.applyReviewClone();

        this.recipeSaveEvent?.subscribe(
            (recipe) => {
                if(this.hasChanged()) {
                    this.acceptReview();
                    this.reviewService.updateReview(recipe, this.review);
                }
            }
        )
    }

    applyReviewClone() {
        this.review = cloneReview(this._origReview);
    }

    acceptReview() {
        this._origReview.description = this.review.description;
        this._origReview.rating = this.review.rating;
    }
}
