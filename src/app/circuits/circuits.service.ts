import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CircuitsService {

  private apiUrl = 'http://ergast.com/api/f1';
  private httpClient = inject(HttpClient);

  getAllCircuits(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/circuits.json`, {
      params: {
        limit: '100',
        offset: '0'
      }
    })
      .pipe(
        map((response: any) => response.MRData.CircuitTable.Circuits)
      );
  }

  getCircuitsBySeason(year: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/${year}/circuits.json`, {
      params: {
        limit: '100',
        offset: '0'
      }
    })
      .pipe(
        map((response: any) => response.MRData.CircuitTable.Circuits)
      );
    }

  getCurrentCircuits(): Observable<any> {
    const currentYear = new Date().getFullYear();

    return this.httpClient.get<any>(`${this.apiUrl}/${currentYear}/races.json`)
      .pipe(
        map((response: any) => {
          let data = response.MRData.RaceTable.Races;
          data.total = response.MRData.total;

          return data;
        }),
        map((circuits: any) => {
          circuits.forEach((circuit: any) => {
            circuit.image = this.getCircuitMap(circuit.Circuit.circuitId);
          })

          return circuits;
        }),
        tap((response) => console.log('response', response))
      );
  }

  private getCircuitMap(circuit: string): string {
    return `${circuit}_Circuit.avif`;
  }
}
