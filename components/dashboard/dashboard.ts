import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather-service.js';
import { Observable, catchError, of, map, startWith } from 'rxjs';

type WeatherState =
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'success'; data: any };

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule], // ✅ Add CommonModule here
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'], // 🔧 use `styleUrls` (plural)
})
export class Dashboard {
  weatherState$!: Observable<WeatherState>;

  constructor(private weatherService: WeatherService) {
    this.weatherState$ = this.weatherService.getLiveWeather().pipe(
      map((data) => ({ status: 'success' as const, data })),
      catchError((err) =>
        of({
          status: 'error' as const,
          error: err?.message || 'Something went wrong.',
        })
      ),
      startWith({ status: 'loading' as const })
    );
  }

  isSuccess(state: WeatherState): state is { status: 'success'; data: any } {
    return state.status === 'success';
  }
}
