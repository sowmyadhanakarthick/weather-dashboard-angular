import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeather(city: string, unit: 'metric' | 'imperial'): Observable<any> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&units=${unit}&appid=${environment.openWeatherApiKey}`;
    return this.http.get(url).pipe(
      catchError((err) => {
        const errorMsg =
          err.status === 404
            ? `City "${city}" not found.`
            : 'Unable to fetch weather data.';
        return throwError(() => new Error(errorMsg));
      })
    );
  }
}
