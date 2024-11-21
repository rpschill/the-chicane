import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CircuitsService {

  private apiUrl = 'http://ergast.com/api/f1';
  private httpClient = inject(HttpClient);

  getAllCircuits(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/circuits.json`)
      .pipe(
        map((response: any) => response.MRData.CircuitTable.Circuits)
      );
  }

  getCurrentCircuits(): Observable<any> {
    const currentYear = new Date().getFullYear();

    return this.httpClient.get<any>(`${this.apiUrl}/${currentYear}/circuits.json`)
      .pipe(
        map((response: any) => response.MRData.CircuitTable.Circuits)
      );
  }

  getCircuitBySeason(season: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/${season}/circuits.json`)
      .pipe(
        map((response: any) => response.MRData.CircuitTable.Circuits)
      );
  }
}
