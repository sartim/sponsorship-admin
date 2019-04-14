import 'rxjs/add/operator/switchMap';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SponsorService} from '../_services';

@Component({
    moduleId: module.id,
    templateUrl: 'sponsor-add.component.html'
})
export class SponsorAddComponent implements OnInit {
    model: any = {};

    constructor(
        private sponsorService: SponsorService,
        private router: Router) { }

    ngOnInit() {}

    add() {
        const body = JSON.stringify({
            first_name : this.model.first_name,
            last_name: this.model.last_name,
            email: this.model.email,
            phone: this.model.phone
        });
        this.sponsorService.create(body)
            .subscribe(
                child => {
                    this.model = child;
                    alert('Saved!');
                    this.router.navigate(['/sponsor/list']);
                },
                error => {
                    console.log('GET Error!!');
                });
    }
}
