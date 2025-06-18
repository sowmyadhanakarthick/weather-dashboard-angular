import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { Dashboard } from './dashboard';
import { WeatherService } from '../../services/weather-service';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WeatherData } from '../../models/weather-data.model';

describe('Dashboard Component', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;
  let mockWeatherService: jasmine.SpyObj<WeatherService>;

  const mockWeatherData: WeatherData = {
    name: 'Bangalore',
    sys: { country: 'IN' },
    main: {
      temp: 25,
      feels_like: 27,
      humidity: 80,
      pressure: 1012,
    },
    weather: [{ description: 'clear sky', icon: '01d' }],
    wind: { speed: 5 },
    visibility: 10000,
  };

  beforeEach(() => {
    mockWeatherService = jasmine.createSpyObj('WeatherService', ['getWeather']);

    TestBed.configureTestingModule({
      imports: [Dashboard, CommonModule, ReactiveFormsModule],
      providers: [{ provide: WeatherService, useValue: mockWeatherService }],
    });

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
  });

  it('should create the component and initialize with default city', () => {
    expect(component).toBeTruthy();
    expect(component.cityControl.value).toBe('Bangalore');
    expect(component.unit).toBe('metric');
  });

  it('should return true for isSuccess with correct state', () => {
    const state = { status: 'success' as const, data: mockWeatherData };
    expect(component.isSuccess(state)).toBeTrue();
  });

  it('should return true for isError with correct state', () => {
    const state = { status: 'error' as const, error: 'Failed to load' };
    expect(component.isError(state)).toBeTrue();
  });

  it('should update unit and trigger weather fetch when setUnit is called', () => {
    spyOn(component.cityControl, 'setValue');

    component.setUnit('imperial');
    expect(component.unit).toBe('imperial');
    expect(component.unit$.value).toBe('imperial');
    expect(component.cityControl.setValue).toHaveBeenCalledWith('Bangalore');
  });

  it('should emit success state with weather data from service', fakeAsync(() => {
    mockWeatherService.getWeather.and.returnValue(of(mockWeatherData));

    let result: any;
    component.weatherState$.subscribe((state) => {
      if (state.status === 'success') result = state.data;
    });

    component.cityControl.setValue('Bangalore');
    tick(500);
    expect(result).toEqual(mockWeatherData);
  }));

  it('should emit error state when service fails', fakeAsync(() => {
    mockWeatherService.getWeather.and.returnValue(
      throwError(() => new Error('API error'))
    );

    let errorMsg = '';
    component.weatherState$.subscribe((state) => {
      if (state.status === 'error') errorMsg = state.error;
    });

    component.cityControl.setValue('InvalidCity');
    tick(500);
    expect(errorMsg).toBe('API error');
  }));

  it('should emit loading state initially', fakeAsync(() => {
    mockWeatherService.getWeather.and.returnValue(of(mockWeatherData));

    let states: string[] = [];
    component.weatherState$.subscribe((state) => {
      states.push(state.status);
    });

    component.cityControl.setValue('Chennai');
    tick(500);
    expect(states[0]).toBe('loading');
  }));
});
