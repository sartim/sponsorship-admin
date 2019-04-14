import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { SponsorService } from '../_services';


@Component({
    moduleId: module.id,
    templateUrl: 'sponsor-detail.component.html'
})
export class SponsorDetailComponent implements OnInit {
    sponsor: any;

    constructor(
        private sponsorService: SponsorService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        this.route.paramMap
        .switchMap((params: ParamMap) => this.sponsorService.getSponsorById(+params.get('id')))
        .subscribe(sponsor => this.sponsor = sponsor);
    }

    update(id) {
        const body = JSON.stringify({
            first_name : this.sponsor.first_name,
            last_name: this.sponsor.last_name,
            email: this.sponsor.email,
            phone: this.sponsor.phone
        });
        this.sponsorService.update(id, body)
            .subscribe(
                sponsor => {
                    this.sponsor = sponsor;
                    console.log('Updated!');
                    this.router.navigate(['/sponsor/list']);
                },
                error => {
                    console.log('GET Error!!');
                });
    }
}
