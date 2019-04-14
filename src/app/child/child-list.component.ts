import 'rxjs/add/operator/switchMap';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User, Child } from '../_models';
import { ChildService } from '../_services';


@Component({
    moduleId: module.id,
    templateUrl: 'child-list.component.html',
    styles: []
})
export class ChildListComponent implements OnInit {
    children: any;

    constructor(
        private childService: ChildService, private router: Router) { }

    ngOnInit() {
        this.getChildren();
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

    search(event) {
        if (event.keyCode === 13) {
            const navigationExtras = {
                queryParams: { q: event.path[0].value }
            };
            this.router.navigate(['/child-search'] , navigationExtras);
        }
    }

    gotoDetail(id: number) {
        this.router.navigate(['/child/', id]);
    }

    delete(id: number) {
        const result = confirm('ARE YOU SURE YOU WANT TO DELETE?');
        if (result) {
            this.childService.delete(id)
                .subscribe(
                    children => {
                        this.children = children;
                        console.log('Deleted');
                        location.reload();
                    },
                    error => {
                        console.log('GET Error!!');
                    });
        }
    }

}
