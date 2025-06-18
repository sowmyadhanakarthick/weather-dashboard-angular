export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
  visibility: number;
  weather: {
    description: string;
    icon: string;
  }[];
}
