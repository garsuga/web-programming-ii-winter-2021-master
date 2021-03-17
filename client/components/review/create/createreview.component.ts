import { Component, Input, Output, EventEmitter } from "@angular/core";
import { User } from "../../interfaces/User";
import { UserService } from "../../services/user.service";
import { Review } from "../../interfaces/Review";

@Component({
    selector: 'create-review',
    template: require('./createreview.component.html'),
    styles: [require('./createreview.component.scss')],
})
export class CreateReviewComponent {
    @Output()
    createReview: EventEmitter<Review> = new EventEmitter();

    @Output()
    cancelReview: EventEmitter<void> = new EventEmitter();

    userList: User[];

    user: User;
    description: string;
    rating: number;

    inputValid: boolean = true;


    static parameters = [UserService];
    constructor(private userService: UserService) {
        userService.getAllUsers().then(users => {
            this.userList = users;
        });
    }

    private buildReview(): Review {
        return {
            description: this.description,
            user: this.user,
            rating: this.rating,
            createDate: new Date(),
            _id: undefined
        };
    }

    isInputValid(): boolean {
        return true;
        //return this.description !== undefined && this.description.length > 1 && this.user !== undefined && this.rating !== undefined && this.rating > 0;
    }

    onUserChange(index: string) {
        this.user = this.userList[parseInt(index)];
    }

    acceptEdit() {
        let r = this.buildReview();
        this.createReview.emit(r);
    }

    rejectEdit() {
        this.cancelReview.emit();
    }

    validateInput() {
        this.inputValid = this.isInputValid();
    }
}
