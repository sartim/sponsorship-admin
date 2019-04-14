import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import apiUrl from '../config/api.js';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class  SponsorService {
    constructor(private http: HttpClient, private userService: UserService) { }

    headers = this.userService.getHeaders();

    getSponsors() {
        return this.http.get(apiUrl + '/api/sponsor', { headers: this.headers }).map(data => data);
    }

    getSponsorById(id: number) {
        return this.http.get(apiUrl + '/api/sponsor/' + id, { headers: this.headers }).map(data => data);
    }

    searchSponsor(search) {
        return this.http.get(apiUrl + '/api/sponsor/search?q=' + search, { headers: this.headers }).map((data) => data);
    }

    create(body) {
        return this.http.post(apiUrl + '/api/sponsor', body,
            { headers: this.headers.set('Content-type', 'application/json') }).map((data) => data);
    }

    update(id: number, body) {
        return this.http.put(apiUrl + '/api/sponsor/' + id, body,
            { headers: this.headers.set('Content-type', 'application/json') }).map((data) => data);
    }

    delete(id: number) {
        return this.http.delete(apiUrl + '/api/sponsor/' + id, { headers: this.headers }).map(data => data);
    }
}
