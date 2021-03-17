import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Recipe} from "../interfaces/Recipe";
import { cloneReview, Review } from '../interfaces/Review';

@Injectable()
export class ReviewService {
    static parameters = [HttpClient];
    constructor(private httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    updateReview(recipe: Recipe, review: Review): Promise<Review> {
        return this.httpClient
            .put<Review>(`/api/recipes/${recipe._id}/reviews/${review._id}`, review)
            .toPromise();
    }

    createReview(recipe: Recipe, review: Review): Promise<Review> {
        return new Promise<Review>((resolve, reject) => {
            this.httpClient
            .post<Review>(`/api/recipes/${recipe._id}/reviews`, {
                ...review,
                _id: undefined,
                user: review.user.username
            })
            .toPromise().then(createdReview => {
                review._id = createdReview._id;
                resolve(review);
            });
        });
    }

    deleteReview(recipe: Recipe, review: Review): Promise<void> {
        return this.httpClient
            .delete<void>(`/api/recipes/${recipe._id}/reviews/${review._id}`)
            .toPromise();
    }
}
