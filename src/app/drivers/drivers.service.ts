import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, filter, map, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  private httpClient = inject(HttpClient);
  private openF1Url = 'https://api.openf1.org/v1/drivers';

  private currentDriversSubject = new BehaviorSubject<any>([]);
  private topThreeDriversSubject = new BehaviorSubject<any>([]);
  private driverHeadshotSubject = new BehaviorSubject<any>([]);

  public currentDrivers$ = this.currentDriversSubject.asObservable();
  public topThreeDrivers$ = this.topThreeDriversSubject.asObservable();
  public driverHeadshot$ = this.driverHeadshotSubject.asObservable();

  getCurrentDrivers(): Observable<any> {
    return this.httpClient.get<any>(`${this.openF1Url}?session_key=latest`)
      .pipe(
        map((response: any) => response),
      )
  }

  getTopThreeDrivers(): Observable<any> {
    return this.httpClient.get<any>(`${this.openF1Url}?session_key=latest`)
      // .pipe(
      //   filter((response: any) => {
      //     return response.name_acronym === driverCodes[0] || response.name_acronym === driverCodes[1] || response.name_acronym === driverCodes[2];
      //   }),
      // )
  }

  getDriverHeadshot(driverCode: string): Observable<any> {
    return this.httpClient.get<any>(`${this.openF1Url}?name_acronym=${driverCode}&session_key=latest`)
      .pipe(
        map((response: any) => {
          const headshot = response = response[0].headshot_url;
          return headshot.split('.transform')[0];
        }),
      )
  }
}
