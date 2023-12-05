import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { DataService } from '../../services/data.service';
import { Point } from '../../models/point.model';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  imports: [GoogleMapsModule],
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  map!: google.maps.Map;
  polylines: google.maps.Polyline[] = [];
  lat = 0;
  lng = 0;

  constructor(private dataService: DataService) {}

  ngAfterViewInit() {
    this.initializeMap();
    this.dataService.selectedRoute$.subscribe((route) => {
      if (route) {
        this.drawRoute(route.points);
      }
    });
  }

  initializeMap() {
    let coordinates = new google.maps.LatLng(this.lat, this.lng);
    let mapOptions: google.maps.MapOptions = {
      center: coordinates,
      zoom: 2,
    };
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
  }

  public drawRoute(points: Point[]): void {
    this.polylines.forEach((polyline) => polyline.setMap(null));
    this.polylines = [];

    let currentPath = [points[0]];
    let lastSpeed = points[0].speed;

    for (let i = 1; i < points.length; i++) {
      const point = points[i];
      if (points[i].speed !== lastSpeed) {
        this.addPolyline(currentPath, lastSpeed);
        currentPath = [points[i - 1]];
        lastSpeed = points[i].speed;
      }
      currentPath.push(point);
    }
    this.addPolyline(currentPath, lastSpeed);

    this.map.fitBounds(this.calculateBounds(points));
  }

  private addPolyline(points: Point[], speed: number): void {
    const googleMapsPoints = points.map(
      (point) => new google.maps.LatLng(point.latitude, point.longitude),
    );
    const polyline = new google.maps.Polyline({
      path: googleMapsPoints,
      geodesic: true,
      strokeColor: this.getSpeedColor(speed),
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    polyline.setMap(this.map);
    this.polylines.push(polyline);
  }
  private getSpeedColor(speed: number): string {
    const speedColorMap = {
      low: '#FF0000',
      medium: '#FFFF00',
      high: '#00FF00',
    };
    if (speed < 7) return speedColorMap['low'];
    if (speed < 14) return speedColorMap['medium'];
    return speedColorMap['high'];
  }

  private calculateBounds(points: Point[]): google.maps.LatLngBounds {
    const bounds = new google.maps.LatLngBounds();
    for (const point of points) {
      bounds.extend(new google.maps.LatLng(point.latitude, point.longitude));
    }
    return bounds;
  }
}
