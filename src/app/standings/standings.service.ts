import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap, tap, take } from 'rxjs/operators';
import { DriversService } from '../drivers/drivers.service';

@Injectable({
  providedIn: 'root'
})
export class StandingsService {

  private apiUrl = 'https://ergast.com/api/f1';
  private httpClient = inject(HttpClient);
  private driversService = inject(DriversService);
  private season = new Date().getFullYear();

  getTopThreeDriverStandings(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/${this.season}/driverstandings.json?limit=3`)
      .pipe(
        map((response: any) => response.MRData.StandingsTable.StandingsLists[0].DriverStandings),
        map((drivers: any) => {
          drivers.forEach((driver: any) => {
            this.driversService.getDriverHeadshot(driver.Driver.code)
              .subscribe((headshot: any) => driver.headshot = headshot);
          })

          return drivers;
        })
      );
  }

  getDriverStandings(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/${this.season}/driverstandings.json`)
      .pipe(
        map((response: any) => response.MRData.StandingsTable.StandingsLists[0].DriverStandings)
      );
  }

  getTopThreeConstructorStandings(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/${this.season}/constructorstandings.json?limit=3`)
      .pipe(
        map((response: any) => response.MRData.StandingsTable.StandingsLists[0].ConstructorStandings),
        map((constructors: any) => {
          constructors.forEach((constructor: any) => {
            let name = constructor.Constructor.name;
            let logoName;

            switch(name) {
              case 'McLaren':
                logoName = 'mclaren';
                break;
              case 'Ferrari':
                logoName = 'ferrari';
                break;
              case 'Red Bull':
                logoName = 'red-bull-racing';
                break;
              case 'Mercedes':
                logoName = 'mercedes';
                break;
              case 'Aston Martin':
                logoName = 'aston-martin';
                break;
              case 'Alpine':
                logoName = 'alpine';
                break;
              case 'Haas F1 Team':
                logoName = 'haas';
                break;
              case 'RB F1 Team':
                logoName = 'rb';
                break;
              case 'Williams':
                logoName = 'williams';
                break;
              case 'Sauber':
                logoName = 'kick-sauber';
                break;
            }
            constructor.logo = `https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/${logoName}.png`;
          })

          return constructors;
        })
      );
  }

  getConstructorStandings(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/${this.season}/constructorstandings.json`)
      .pipe(
        map((response: any) => response.MRData.StandingsTable.StandingsLists[0].ConstructorStandings)
      );
  }
}
