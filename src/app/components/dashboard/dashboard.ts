import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather-service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import {
  map,
  catchError,
  startWith,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  combineLatestWith,
} from 'rxjs/operators';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { WeatherData } from '../../models/weather-data.model';

type WeatherState =
  | { status: 'loading' }
  | { status: 'success'; data: WeatherData }
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

  public unit$ = new BehaviorSubject<'metric' | 'imperial'>('metric');
  unit: 'metric' | 'imperial' = 'metric';

  public lastUpdatedTime: string = '';

  weatherState$: Observable<WeatherState>;

  constructor(private weatherService: WeatherService) {
    const city$ = this.cityControl.valueChanges.pipe(
      startWith(this.cityControl.value),
      debounceTime(500),
      distinctUntilChanged()
    );

    this.weatherState$ = this.cityControl.valueChanges.pipe(
      startWith(this.cityControl.value),
      debounceTime(500),
      distinctUntilChanged(),
      combineLatestWith(this.unit$),
      switchMap(([city, unit]) =>
        this.weatherService.getWeather(city || 'Bangalore', unit).pipe(
          map((data) => {
            this.lastUpdatedTime = new Date().toLocaleString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
              day: 'numeric',
              month: 'short',
            });
            return { status: 'success' as const, data };
          }),
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
    this.unit$.next(unit);
    this.unit = unit;
    const currentCity = this.cityControl.value || 'Bangalore';
    this.cityControl.setValue(currentCity);
  }
}
