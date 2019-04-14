import { Component, OnInit } from '@angular/core';
import * as M from '../assets/admin-assets/js/materialize.min';


@Component({
    moduleId: module.id,
    selector: 'app-root',
    styles: [],
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
    Collapsible: any;
    Dropdown: any;

    constructor() {
    }

    ngOnInit() {
        this.dropDownTrigger();
        this.collapsible();
    }

    collapsible() {
        const elems = document.querySelectorAll('.collapsible');
        const options = {};
        const instances = M.Collapsible.init(elems, options);
    }

    dropDownTrigger() {
        const elems = document.querySelectorAll('.dropdown-trigger');
        const options = {};
        const instances = M.Dropdown.init(elems, options);
    }
}
