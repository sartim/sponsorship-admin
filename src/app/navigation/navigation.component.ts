import { Component, OnInit } from '@angular/core';

import { User } from '../_models';

import CryptoJS from 'crypto-js';

@Component({
    moduleId: module.id,
    selector: 'app-navigation',
    templateUrl: 'navigation.component.html'
})
export class NavigationComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    loggedUser: User;


    constructor() {
        const ciphertext = localStorage.getItem('currentUser');
        if (ciphertext) {
            const bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'add_supper_secret');
            this.currentUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            if (this.currentUser) {
                console.log(this.currentUser.data.first_name);
            }
        }
    }
    ngOnInit() {
    }
}
