import { User } from "./User";

export class Review {
    _id: string;
    description: string;
    rating: number;
    createDate: Date;
    user: User;
}

export function cloneReview(review: Review): Review {
    // shallow copy of review
    let c = {...review};
    return c;
}
