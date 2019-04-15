import {Component, OnInit, OnDestroy, NgZone} from '@angular/core';
import { User } from '../_models';
import {ContributionService} from '../_services/contribution.service';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styles: [``]
})

export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    totalContributions: any;
    thisMonthContributions: any;
    thisYearContributions: any;
    thisYearlyContributions: any;
    private chart: am4charts.XYChart;

    constructor(private contributionsService: ContributionService, private zone: NgZone) {}

    ngOnInit() {
        this.initScript();
        this.getTotalContributions();
        this.getThisMonthContributions();
        this.getThisYearContributions();
        this.getYearlyContributions();
    }

    ngAfterViewInit() {
        if (localStorage.getItem('reload') === 'true') {
            location.reload();
            localStorage.setItem('reload', 'false');
        }
        this.zone.runOutsideAngular(() => {
            const chart = am4core.create('chartdiv', am4charts.XYChart);
            chart.marginRight = 400;

            chart.data = this.thisYearlyContributions;
            // chart.dataSource.url = "chart_data.json";

            // Create axes
            const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = 'year';
            categoryAxis.title.text = 'Yearly contributions';
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 20;


            const  valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.title.text = 'Contributions ($)';

            // Create series
            const series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueY = 'contribution';
            series.dataFields.categoryX = 'year';
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

    initScript() {
        document.body.style.display = 'block';
        document.documentElement.style.display = 'block';
        document.body.style.backgroundColor = '#f9f9f9';
        document.getElementById('header').style.display = 'block';
        document.getElementById('left-sidebar-nav').style.display = 'block';
    }

    private getTotalContributions() {
        this.contributionsService.getTotal()
            .subscribe(
                totalContributions => {
                    this.totalContributions = totalContributions[0];
                },
                error => {
                    console.log('GET Error!!');
                });
    }

    private getThisMonthContributions() {
        this.contributionsService.getThisMonth()
            .subscribe(
                thisMonthContributions => {
                    this.thisMonthContributions = thisMonthContributions[0];
                },
                error => {
                    console.log('GET Error!!');
                });
    }

    private getThisYearContributions() {
        const d = new Date();
        const y = d.getFullYear();
        this.contributionsService.getByYear(y)
            .subscribe(
                thisYearContributions => {
                    this.thisYearContributions = thisYearContributions[0];
                },
                error => {
                    console.log('GET Error!!');
                });
    }

    private getYearlyContributions() {
        this.contributionsService.getYearly()
            .subscribe(
                thisYearlyContributions => {
                    this.thisYearlyContributions = thisYearlyContributions;
                    this.ngAfterViewInit();
                },
                error => {
                    console.log('GET Error!!');
                    location.reload();
                });
    }
}
