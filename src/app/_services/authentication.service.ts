import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {UserService} from './user.service';
import apiUrl from '../config/api.js';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import CryptoJS from 'crypto-js';

@Injectable()
export class AuthenticationService {
    constructor(private userService: UserService, private http: HttpClient) { }
    login(email: string, password: string) {

        const body = JSON.stringify({email, password});
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post(apiUrl + '/api/login', body, { headers, observe: 'response' })
            .map((data) => {
                // login successful if there's a jwt token in the response
                const userData = data.body;
                if (userData) {
                    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(userData), 'add_supper_secret');
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', ciphertext);
                }
                return userData;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
