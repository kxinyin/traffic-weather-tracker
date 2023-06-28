export interface ResultsType {
  area_name: string;
  forecast: string;
  forecast_timestamp: string;
  forecast_valid_period: ResultsForecastValidPeriodType;
  traffic: ResultsTrafficType[];
}

interface ResultsForecastValidPeriodType {
  start: string;
  end: string;
}

interface ResultsTrafficType {
  image: string;
  height: number;
  width: number;
  timestamp: string;
}
