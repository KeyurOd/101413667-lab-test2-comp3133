import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mission } from './mission';

@Injectable({
  providedIn: 'root'
})
export class SpacexService {
  private apiUrl = 'https://api.spacexdata.com/v3/launches';

  constructor(private http: HttpClient) {}

  getLaunches(launchYear?: string): Observable<Mission[]> {
    const url = launchYear ? `${this.apiUrl}?launch_year=${launchYear}` : this.apiUrl;
    return this.http.get<Mission[]>(url);
  }

  getLaunchById(id: number): Observable<Mission> {
    return this.http.get<Mission>(`${this.apiUrl}/${id}`);
  }
}