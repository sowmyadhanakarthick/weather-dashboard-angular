import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, startWith, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '23a66759efc9f6a3636107b09c2c2a6a'; // 🔁 Replace with your actual OpenWeatherMap API key
  private city = 'Chennai'; // You can make this dynamic later
  private apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${this.apiKey}`;

  constructor(private http: HttpClient) {}

  /**
   * Fetch live weather data every 60 seconds
   */
  getLiveWeather(): Observable<any> {
    return interval(60000).pipe(
      // Trigger every 60 sec
      startWith(0), // Fire immediately on subscription
      switchMap(() => this.http.get(this.apiUrl))
    );
  }
}
