import 'rxjs/add/operator/switchMap';
import {ActivatedRoute, Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User, Child } from '../_models';
import {ChildService, SponsorService} from '../_services';
import {AppComponent} from '../app.component';


@Component({
    moduleId: module.id,
    templateUrl: 'sponsor-search.component.html',
    styles: []
})
export class SponsorSearchComponent implements OnInit {
    sponsors: any;

    constructor(
        private sponsorService: SponsorService,
        private appComponent: AppComponent,
        private route: ActivatedRoute,
        private router: Router) { }

    q: string;

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.q = params.q;
            this.searchName(this.q);
        });
    }

    searchName(search: string) {
        this.sponsorService.searchSponsor(this.toTitleCase(search))
            .subscribe(
                sponsors => {
                    this.sponsors = sponsors;
                },
                error => {
                    console.log('GET Error!!');
                });
    }

    toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            (txt) => {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    gotoDetail(id: number) {
        this.router.navigate(['/sponsor/', id]);
    }

    delete(id: number) {
        this.sponsorService.delete(id)
            .subscribe(
                sponsors => {
                    this.sponsors = sponsors;
                    console.log('Deleted');
                    this.router.navigate(['/sponsor/list']);
                },
                error => {
                    console.log('GET Error!!');
                });
    }
}
