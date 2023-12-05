import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Route } from '../models/route.model';
import * as Papa from 'papaparse';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private routesUrl = 'assets/data/web_challenge.csv'; // URL to web API
  private selectedRoute = new BehaviorSubject<Route | null>(null);
  selectedRoute$ = this.selectedRoute.asObservable();

  constructor(private http: HttpClient) { }

  getRoutes(): Observable<Route[]> {
    return this.http.get(this.routesUrl, { responseType: 'text' })
      .pipe(
        map(this.parseCSVToRoutes),
        catchError(this.handleError)
      );
  }

  selectRoute(route: Route): void {
    this.selectedRoute.next(route);
  }

  private parseCSVToRoutes(csvText: string): Route[] {
    let routes: Route[] = [];

    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (result: { data: any[]; }) => {
        result.data.forEach(row => {
          const pointsData = JSON.parse(row.points);
          const points = pointsData.map((point: any) => ({
            longitude: point[0],
            latitude: point[1],
            timestamp: point[2],
            speed: point[3]
          }));

          routes.push({
            route_id: row.route_id,
            from_port: row.from_port,
            to_port: row.to_port,
            leg_duration: +row.leg_duration,
            points: points
          });
        });
      }
    });

    return routes;
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(() => error.message || 'Server error');
  }
}
