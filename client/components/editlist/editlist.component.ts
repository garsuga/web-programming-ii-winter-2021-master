import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'edit-list',
    template: require('./editlist.component.html'),
    styles: [require('./editlist.component.scss')],
})
export class EditListComponent {
    @Input()
    numbered: boolean;

    @Input()
    values: any[];

    @Input()
    editing: boolean;

    @Input()
    inputType: string;

    @Input()
    valueMembers?: string[] = undefined;

    @Input()
    showMemberNames?: boolean = false;

    @Output()
    updateElement: EventEmitter<{index: number, value: any}> = new EventEmitter();

    constructor() {
    }

    cloneMember(value: any): any{
        let c = {...value};
        if(c._id !== undefined) {
            c._id = undefined;
        }
        return c;
    }
}
