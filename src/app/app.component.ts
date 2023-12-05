import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './component/map/map.component';
import { RoutePickerComponent } from './component/route-picker/route-picker.component';
import { SpeedChartComponent } from './component/speed-chart/speed-chart.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MapComponent,
    RoutePickerComponent,
    SpeedChartComponent,
    MatSidenavModule,
    MatSelectModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'visualise-exported-sea-routes';
}
