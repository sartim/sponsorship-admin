import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import apiUrl from '../config/api.js';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class  ChildService {
    constructor(private http: HttpClient, private userService: UserService) { }

    headers = this.userService.getHeaders();

    getChildren() {
        return this.http.get(apiUrl + '/api/child', { headers: this.headers }).map((data) => data);
    }

    getChildById(id: number) {
        return this.http.get(apiUrl + '/api/child/' + id, { headers: this.headers }).map((data) => data);
    }

    searchChild(search) {
        return this.http.get(apiUrl + '/api/child/search?q=' + search, { headers: this.headers }).map((data) => data);
    }

    getContributions(id: number) {
        return this.http.get(apiUrl + '/api/child/monthly/contribution', { headers: this.headers }).map((data) => data);
    }

    getYearlyContribution(id: number) {
        return this.http.get(apiUrl + '/api/child/yearly/contribution?child_id=' + id, { headers: this.headers }).map((data) => data);
    }

    monthlyContribution(id: number, year: number) {
        return this.http.get(apiUrl + '/api/child/monthly/contribution?child_id=' + id + '&year=' + year,
            { headers: this.headers }).map((data) => data);
    }

    getAllContributions(id: number) {
        return this.http.get(apiUrl + '/api/child/contribution/' + id, { headers: this.headers }).map((data) => data);
    }

    update(id: number, body) {
        return this.http.put(apiUrl + '/api/child' + id, body,
            { headers: this.headers.set('Content-type', 'application/json') }).map((data) => data);
    }

    create(body) {
        return this.http.post(apiUrl + '/api/child', body,
            { headers: this.headers.set('Content-type', 'application/json') }).map((data) => data);
    }

    delete(id: number) {
        return this.http.delete(apiUrl + '/api/child/' + id, { headers: this.headers }).map(data => data);
    }
}
