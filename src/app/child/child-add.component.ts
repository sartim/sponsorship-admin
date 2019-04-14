import 'rxjs/add/operator/switchMap';
import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { ChildService } from '../_services';

am4core.useTheme(am4themes_animated);

@Component({
    moduleId: module.id,
    templateUrl: 'child-add.component.html'
})
export class ChildAddComponent implements OnInit {
    model: any = {};

    constructor(
        private childService: ChildService,
        private router: Router) { }

    ngOnInit() {}

    add() {
        const body = JSON.stringify({
            first_name : this.model.first_name,
            last_name: this.model.last_name,
            date_of_birth: this.model.date_of_birth,
            gender_id: this.model.gender_id
        });
        this.childService.create(body)
            .subscribe(
                child => {
                    this.model = child;
                    alert('Saved!');
                    this.router.navigate(['/child/list']);
                },
                error => {
                    console.log('GET Error!!');
                });
    }
}
