import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { WeatherService } from './weather-service';
import { environment } from '../../environments/environment';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch weather data for a valid city', () => {
    const mockResponse = {
      name: 'Bangalore',
      main: { temp: 25, humidity: 70 },
      wind: { speed: 5 },
      weather: [{ description: 'clear sky', icon: '01d' }],
    };

    service.getWeather('Bangalore', 'metric').subscribe((data) => {
      expect(data.name).toBe('Bangalore');
      expect(data.main.temp).toBe(25);
    });

    const req = httpMock.expectOne(
      `https://api.openweathermap.org/data/2.5/weather?q=Bangalore&units=metric&appid=${environment.openWeatherApiKey}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
