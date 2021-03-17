import { Name } from "./Name";


export class User {
    _id: string;
    username: string;
    email: string;
    name: Name;
}

export function cloneUser(user: User): User {
    let c = {...user};

    c.name = {...user.name};

    return c;
}
