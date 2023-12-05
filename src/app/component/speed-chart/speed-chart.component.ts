import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Route } from '../../models/route.model';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import * as d3Shape from 'd3-shape';

@Component({
  selector: 'app-speed-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './speed-chart.component.html',
  styleUrl: './speed-chart.component.css',
})
export class SpeedChartComponent implements OnInit {
  chartData: any[] = [];

  // ngx-charts
  chartOptions: any = {
    view: [900, 500],
    showXAxis: true,
    showYAxis: true,
    gradient: false,
    showLegend: true,
    showXAxisLabel: true,
    xAxisLabel: 'Time',
    showYAxisLabel: true,
    yAxisLabel: 'Speed',
    curve: d3Shape.curveBasis,
  };

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.selectedRoute$.subscribe((route) => {
      if (route) {
        this.chartData = this.transformData(route);
      } else {
        this.chartData = [];
      }
    });
  }

  transformData(route: Route) {
    const series = route.points.map((point) => {
      return {
        name: new Date(point.timestamp),
        value: point.speed !== null ? point.speed : 0,
      };
    });
    return [
      {
        name: route.route_id,
        series: series,
      },
    ];
  }
}
