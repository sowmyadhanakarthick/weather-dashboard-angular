import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { Dashboard } from './dashboard';
import { WeatherService } from '../../services/weather-service';
import { WeatherData } from '../../models/weather-data.model';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('Dashboard Component', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;
  let mockWeatherService: jasmine.SpyObj<WeatherService>;

  const mockData: WeatherData = {
    name: 'Bangalore',
    main: { temp: 25, humidity: 60 },
    wind: { speed: 5 },
    weather: [{ description: 'clear sky', icon: '01d' }],
  };

  beforeEach(async () => {
    mockWeatherService = jasmine.createSpyObj('WeatherService', ['getWeather']);
    await TestBed.configureTestingModule({
      imports: [Dashboard, ReactiveFormsModule],
      providers: [{ provide: WeatherService, useValue: mockWeatherService }],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
  });

  it('should create the dashboard component', () => {
    expect(component).toBeTruthy();
  });

  it('should load weather data on init', fakeAsync(() => {
    mockWeatherService.getWeather.and.returnValue(of(mockData));

    fixture.detectChanges();
    tick(500);

    component.weatherState$.subscribe((state) => {
      if (component.isSuccess(state)) {
        expect(state.data.name).toBe('Bangalore');
        expect(state.data.main.temp).toBe(25);
      }
    });
  }));

  it('should show error state if service fails', fakeAsync(() => {
    mockWeatherService.getWeather.and.returnValue(
      throwError(() => new Error('Service failed'))
    );

    fixture.detectChanges();
    tick(500);

    component.weatherState$.subscribe((state) => {
      if (component.isError(state)) {
        expect(state.error).toContain('Service failed');
      }
    });
  }));

  it('should update unit and trigger weather fetch', () => {
    const setValueSpy = spyOn(component.cityControl, 'setValue');
    component.setUnit('imperial');
    expect(component.unit).toBe('imperial');
    expect(setValueSpy).toHaveBeenCalled();
  });

  it('isSuccess() should return true only for success state', () => {
    const state: any = { status: 'success', data: mockData };
    expect(component.isSuccess(state)).toBeTrue();
    expect(component.isError(state)).toBeFalse();
  });

  it('isError() should return true only for error state', () => {
    const state: any = { status: 'error', error: 'Oops' };
    expect(component.isError(state)).toBeTrue();
    expect(component.isSuccess(state)).toBeFalse();
  });
});
