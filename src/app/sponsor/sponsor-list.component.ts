import 'rxjs/add/operator/switchMap';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SponsorService } from '../_services';


@Component({
    moduleId: module.id,
    templateUrl: 'sponsor-list.component.html',
    styles: []
})
export class SponsorListComponent implements OnInit {
    sponsors: any;

    constructor(
        private sponsorService: SponsorService,
        private router: Router) { }

    ngOnInit() {
        this.getSponsors();
    }

    getSponsors() {
        this.sponsorService.getSponsors()
            .subscribe(
                sponsors => {
                    this.sponsors = sponsors;
                },
                error => {
                    console.log('GET Error!!');
                });
    }

    search(event) {
        if (event.keyCode === 13) {
            const navigationExtras = {
                queryParams: { q: event.path[0].value }
            };
            this.router.navigate(['/sponsor-search'] , navigationExtras);
        }
    }

    delete(id: number) {
        const result = confirm('ARE YOU SURE YOU WANT TO DELETE?');
        if (result) {
            this.sponsorService.delete(id)
                .subscribe(
                    sponsors => {
                        this.sponsors = sponsors;
                        console.log('Deleted');
                        location.reload();
                    },
                    error => {
                        console.log('GET Error!!');
                    });
        }
    }

    gotoDetail(id: number) {
      this.router.navigate(['/sponsor/', id]);
    }
}
