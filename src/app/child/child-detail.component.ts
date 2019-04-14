import 'rxjs/add/operator/switchMap';
import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { ChildService } from '../_services';
import {ContributionService} from '../_services/contribution.service';

am4core.useTheme(am4themes_animated);

@Component({
    moduleId: module.id,
    templateUrl: 'child-detail.component.html'
})
export class ChildDetailComponent implements OnInit {
    child: any = {};
    childContributions: any;
    childYearlyContribution: any;
    contribution: any;

    constructor(
        private childService: ChildService,
        private contributionService: ContributionService,
        private route: ActivatedRoute,
        private zone: NgZone,
        private router: Router) { }

    ngOnInit() {
        this.route.paramMap
        .switchMap((params: ParamMap) => this.childService.getChildById(+params.get('id')))
        .subscribe(child => {
            this.child = child;

        });

        this.route.paramMap
            .switchMap((params: ParamMap) => this.childService.getYearlyContribution(+params.get('id')))
            .subscribe(childYearlyContribution => {
                this.childYearlyContribution = childYearlyContribution;
                console.log(this.childYearlyContribution);
            });

        this.route.paramMap
            .switchMap((params: ParamMap) => this.childService.getAllContributions(+params.get('id')))
            .subscribe(childContributions => {
                this.childContributions = childContributions;
                console.log(this.childContributions);
            });
    }

    goToYearContribution(id: number, year) {
        const navigationExtras = {
            queryParams: { id, year }
        };
        this.router.navigate(['child-contribution'] , navigationExtras);
    }

    addContribution(id) {
        this.router.navigate(['add-contribution']);
    }

    update(id) {
        const body = JSON.stringify({
            first_name : this.child.first_name,
            last_name: this.child.last_name,
            date_of_birth: this.child.date_of_birth,
            gender_id: this.child.gender_id
        });
        this.childService.update(id, body)
            .subscribe(
                child => {
                    this.child = child;
                    alert('Updated!');
                    this.router.navigate(['/child/list']);
                },
                error => {
                    console.log('GET Error!!');
                });
    }

    delete(id: number) {
        const result = confirm('ARE YOU SURE YOU WANT TO DELETE?');
        if (result) {
            this.contributionService.delete(id)
                .subscribe(
                    contribution => {
                        this.contribution = contribution;
                        this.router.navigate(['/child/list']);
                    },
                    error => {
                        console.log('GET Error!!');
                    });
        }
    }
}
