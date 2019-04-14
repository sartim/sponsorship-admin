import 'rxjs/add/operator/switchMap';
import {ActivatedRoute, Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User, Child } from '../_models';
import { ChildService } from '../_services';
import {AppComponent} from '../app.component';


@Component({
    moduleId: module.id,
    templateUrl: 'child-search.component.html',
    styles: []
})
export class ChildSearchComponent implements OnInit {
    children: any;

    constructor(
        private childService: ChildService,
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
        this.childService.searchChild(this.toTitleCase(search))
            .subscribe(
                children => {
                    this.children = children;
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
        this.router.navigate(['/child/', id]);
    }

    delete(id: number) {
        this.childService.delete(id)
            .subscribe(
                children => {
                    this.children = children;
                    console.log('Deleted');
                    this.router.navigate(['/child/list']);
                },
                error => {
                    console.log('GET Error!!');
                });
    }
}
