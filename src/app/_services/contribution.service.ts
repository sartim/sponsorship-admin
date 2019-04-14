import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import apiUrl from '../config/api.js';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class  ContributionService {
    constructor(private http: HttpClient, private userService: UserService) { }

    headers = this.userService.getHeaders();

    monthlyContribution() {
        return this.http.get(apiUrl + '/api/contribution/monthly', { headers: this.headers }).map((data) => data);
    }

    getByYearMonthlyContribution(id: number) {
        return this.http.get(apiUrl + '/api/child/yearly/contribution?child_id=' + id, { headers: this.headers }).map((data) => data);
    }

    getYearly() {
        return this.http.get(apiUrl + '/api/contribution/yearly', { headers: this.headers }).map((data) => data);
    }

    getTotal() {
        return this.http.get(apiUrl + '/api/contribution/total', { headers: this.headers }).map((data) => data);
    }

    getThisMonth() {
        return this.http.get(apiUrl + '/api/contribution/this-month', { headers: this.headers }).map((data) => data);
    }

    getByYear(year: number) {
        return this.http.get(apiUrl + '/api/contribution?year=' + year, { headers: this.headers }).map((data) => data);
    }

    update(id: number, body) {
        return this.http.put(apiUrl + '/api/contribution/' + id, body,
            { headers: this.headers.set('Content-type', 'application/json') }).map((data) => data);
    }

    create(body) {
        return this.http.post(apiUrl + '/api/contribution', body,
            { headers: this.headers.set('Content-type', 'application/json') }).map((data) => data);
    }

    delete(id: number) {
        return this.http.delete(apiUrl + '/api/contribution/' + id, { headers: this.headers }).map(data => data);
    }
}
