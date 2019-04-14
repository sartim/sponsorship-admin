import 'rxjs/add/operator/switchMap';
import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { ChildService } from '../_services';

am4core.useTheme(am4themes_animated);

@Component({
    moduleId: module.id,
    templateUrl: 'child-contribution.component.html'
})
export class ChildContributionComponent implements OnInit, OnDestroy {
    child: any;
    contribution: any;
    id: any;
    year: any;

    private chart: am4charts.XYChart;

    constructor(
        private childService: ChildService,
        private route: ActivatedRoute,
        private zone: NgZone) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.id = params.id;
            this.year = params.year;
            this.getChildContribution(this.id, this.year);
        });
    }

    getChildContribution(childId, year) {
        this.childService.monthlyContribution(childId, year)
            .subscribe(
                contribution => {
                    this.contribution = contribution;
                    this.ngAfterViewInit();
                    localStorage.setItem('contribution', JSON.stringify(this.contribution));
                },
                error => {
                    console.log('GET Error!!');
                });
    }

    ngAfterViewInit() {
        this.zone.runOutsideAngular(() => {
            const chart = am4core.create('chartdiv', am4charts.XYChart)
            chart.marginRight = 400;

            chart.data = this.contribution;
            // chart.dataSource.url = "chart_data.json";

            // Create axes
            const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = 'month';
            categoryAxis.title.text = 'Monthly contributions';
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 20;


            const  valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.title.text = 'Contributions ($)';

// Create series
            const series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueY = 'contribution';
            series.dataFields.categoryX = 'month';
            series.name = 'Contribution';
            series.tooltipText = '{name}: [bold]{valueY}[/]';
            series.stacked = true;

// Add cursor
            chart.cursor = new am4charts.XYCursor();

            this.chart = chart;
        });
    }

    ngOnDestroy() {
        this.zone.runOutsideAngular(() => {
            if (this.chart) {
                this.chart.dispose();
            }
        });
    }
}
