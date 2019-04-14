import 'rxjs/add/operator/switchMap';
import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {ChildService, SponsorService} from '../_services';
import {ContributionService} from '../_services/contribution.service';

am4core.useTheme(am4themes_animated);

@Component({
    moduleId: module.id,
    templateUrl: 'child-add-contribution.component.html'
})
export class ChildAddContributionComponent implements OnInit {
    model: any = {};
    children: any;
    sponsors: any;

    constructor(
        private contributionService: ContributionService,
        private childService: ChildService,
        private sponsorService: SponsorService,
        private router: Router) { }

    ngOnInit() {
        this.getChildren();
        this.getSponsor();
    }

    getChildren() {
        this.childService.getChildren()
            .subscribe(
                children => {
                    this.children = children;
                },
                error => {
                    console.log('GET Error!!');
                });
    }

    getSponsor() {
        this.sponsorService.getSponsors()
            .subscribe(
                sponsors => {
                    this.sponsors = sponsors;
                },
                error => {
                    console.log('GET Error!!');
                });
    }

    add() {
        const body = JSON.stringify({
            child_id : this.model.child,
            sponsor_id: this.model.sponsor,
            currency_id: 1,
            contribution: parseFloat(this.model.contribution)
        });
        console.log(this.model.child);
        this.contributionService.create(body)
            .subscribe(
                contribution => {
                    this.model = contribution;
                    alert('Saved!');
                    this.router.navigate(['/child/list']);
                },
                error => {
                    console.log('GET Error!!');
                });
    }
}
