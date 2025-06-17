import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather-service';
import { Observable, of, map, catchError, startWith } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
type WeatherState =
  | { status: 'loading' }
  | { status: 'success'; data: any }
  | { status: 'error'; error: string };

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  cityControl = new FormControl('Bangalore');
  unit: 'metric' | 'imperial' = 'metric';

  weatherState$: Observable<WeatherState>;

  constructor(private weatherService: WeatherService) {
    this.cityControl = new FormControl('Bangalore');

    this.weatherState$ = this.cityControl.valueChanges.pipe(
      startWith(this.cityControl.value),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((city) =>
        this.weatherService.getWeather(city || 'Bangalore', this.unit).pipe(
          map((data) => ({ status: 'success' as const, data })),
          catchError((err) =>
            of({
              status: 'error' as const,
              error: err.message || 'Unable to fetch weather data.',
            })
          ),
          startWith({ status: 'loading' as const })
        )
      )
    );
  }

  isSuccess(state: WeatherState): state is { status: 'success'; data: any } {
    return state.status === 'success';
  }

  isError(state: WeatherState): state is { status: 'error'; error: string } {
    return state.status === 'error';
  }

  setUnit(unit: 'metric' | 'imperial') {
    this.unit = unit;
    const currentCity = this.cityControl.value || 'Bangalore';
    this.cityControl.setValue(currentCity); // trigger update
  }
}
