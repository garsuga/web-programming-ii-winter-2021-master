import { Component, Input, OnInit } from "@angular/core";
import { cloneUser, User } from "../../../components/interfaces/User";
import { UserService } from "../../services/user.service";

@Component({
    selector: 'users',
    template: require('./user.page.html'),
    styles: [require('./user.page.scss')],
})
export class UsersPage {

    users: User[];
    _origUsers: User[];

    modifiedUsers: User[] = [];
    addedUsers: User[] = [];

    editing: boolean = false;

    static parameters = [UserService]
    constructor(private userService: UserService) {
        userService.getAllUsers().then(users => {
            this.users = users;
            this._origUsers = this.users;
            this.applyUsersClone();
        })
    }

    applyUsersClone() {
        this.users = this.cloneUsers(this._origUsers);
    }

    cloneUsers(users: User[]): User[] {
        let c = [];

        for(let user of users) {
            c.push(cloneUser(user));
        }
        return c;
    }

    acceptEdits() {
        for(let modifiedUser of this.modifiedUsers) {
            this.userService.updateUser(modifiedUser);
        }

        for(let addedUser of this.addedUsers) {
            let index = this.users.indexOf(addedUser);
            this.users.splice(index, 1);
            this.userService.createUser(addedUser).then(createdUser => {
                this.users.splice(index, 0, createdUser);
            });
        }

        this.modifiedUsers = [];
        this.addedUsers = [];
        this._origUsers = this.cloneUsers(this.users);
    }

    rejectEdits() {
        this.applyUsersClone();
        this.modifiedUsers = [];
        this.addedUsers = [];
    }

    markUser(index: number) {
        if(!this.addedUsers.includes(this.users[index]) && !this.modifiedUsers.includes(this.users[index])) {
            this.modifiedUsers.push(this.users[index]);
        }
    }

    private makeRandomName(length: number): string {
        let res = "";
        for(let i = 0; i < length; i++) {
            res += String.fromCharCode(Math.floor(Math.random() * 26) + 65)
        }
        return res;
    }

    addUser() {
        let nUser: User = {
            _id: undefined,
            name: {
                _id: undefined,
                firstName: "First",
                lastName: "Last"
            },
            email: this.makeRandomName(10) + "@example.com",
            username: this.makeRandomName(12)
        }

        this.users.push(nUser);
        this.addedUsers.push(nUser);
    }

    deleteUser(user: User) {
        this.users.splice(this.users.indexOf(user), 1);

        if(!this.addedUsers.includes(user)){
            this._origUsers.splice(this._origUsers.indexOf(user), 1);
            this.userService.deleteUser(user);
        } else {
            this.addedUsers.splice(this.addedUsers.indexOf(user), 1);
        }
    }
}
