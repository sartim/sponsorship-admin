import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from '../_models';
import apiUrl from '../config/api.js';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import * as CryptoJS from 'crypto-js';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    create(user: User) {
        return this.http.post(apiUrl + '/api/register/', user, { })
            .map(data => data);
    }

    jwt() {
        // create authorization header with jwt token
        const ciphertext = localStorage.getItem('currentUser');
        const bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'add_supper_secret');
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        console.log(decryptedData);
        if (decryptedData && decryptedData.data.api_token) {
            return decryptedData.data.api_token;
        }
    }

    getHeaders() {
        return new HttpHeaders().set('Authorization', 'Bearer ' + this.jwt());
    }
}
