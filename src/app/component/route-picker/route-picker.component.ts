import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Route } from '../../models/route.model';
import { CommonModule } from '@angular/common';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-route-picker',
  standalone: true,
  imports: [CommonModule, MatSelectModule],
  templateUrl: './route-picker.component.html',
  styleUrl: './route-picker.component.css',
})
export class RoutePickerComponent implements OnInit {
  routes: Route[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getRoutes().subscribe((data: Route[]) => {
      this.routes = data;
    });
  }

  onRouteSelected(event: MatSelectChange) {
    if (event.value) {
      const routeId = event.value;
      const selectedRoute = this.routes.find(
        (route) => route.route_id === routeId,
      );
      if (selectedRoute) {
        this.dataService.selectRoute(selectedRoute);
      }
    }
  }
}
