import cameraFile from "../data/camera.json";
import { ResultsType } from "../types/results";
import { getLocationName } from "./get-location-name";

const BASE_URL = process.env.REACT_APP_GOV_DATA_BASE_URL;

interface GetLocationDetailsReturnType {
  success: boolean;
  message: string;
  data: ResultsType[] | null;
}

export const getLocationDetails = async (param: {
  date: string;
  time: string;
}): Promise<GetLocationDetailsReturnType> => {
  try {
    const encoded_datetime = encodeURIComponent(
      `${param.date}T${param.time}:00`
    );

    const headers = { Accept: "application/json" };

    // call traffic images api
    const traffic_response = await fetch(
      `${BASE_URL}/transport/traffic-images?date_time=${encoded_datetime}`,
      { method: "GET", headers }
    );

    const traffic_json = await traffic_response.json();

    if (!traffic_response.ok) {
      return {
        success: false,
        message: `traffic images api error: ${traffic_json.message}`,
        data: null,
      };
    }

    // call weather forecast api
    const weather_response = await fetch(
      `${BASE_URL}/environment/2-hour-weather-forecast?date_time=${encoded_datetime}&date=${param.date}`,
      { method: "GET", headers }
    );

    const weather_json = await weather_response.json();

    if (!weather_response.ok) {
      return {
        success: false,
        message: `weather forecast api error: ${weather_json.message}`,
        data: null,
      };
    }

    // initialize data returned from api
    let return_traffic = traffic_json.items[0].cameras;
    let return_areas = weather_json.area_metadata;
    const return_weathers = weather_json.items[0];

    // retrieve default camera data
    const cameras_data: { [key: string]: string } = { ...cameraFile };

    // retrieve area name from default camera data or google geocode api by latitude and longtitude, and map into traffic data
    return_traffic = await Promise.all(
      return_traffic.map(
        async (each: {
          camera_id: string;
          image: string;
          image_metadata: { height: number; width: number };
          location: { latitude: number; longtitude: number };
          timestamp: string;
        }) => {
          let area = cameras_data[each.camera_id] || "";

          if (!area) {
            const lat = each.location.latitude;
            const long = each.location.longtitude;

            if (lat && long) {
              area = await getLocationName({ lat, long });
            }
          }

          return {
            area,
            image: each.image,
            image_metadata: each.image_metadata,
            timestamp: each.timestamp,
          };
        }
      )
    );

    // retrieve weather and traffic info for the respective area
    const data = return_areas.map((area: { name: string }) => {
      const weather = return_weathers.forecasts.find(
        (each: { area: string }) => each.area === area.name
      );

      let traffic = return_traffic.filter(
        (each: { area: string }) => each.area === area.name
      );

      traffic = traffic.map(
        (each: {
          image: string;
          image_metadata: { height: number; width: number };
          timestamp: string;
        }) => {
          return {
            image: each.image,
            height: each.image_metadata.height,
            width: each.image_metadata.width,
            timestamp: each.timestamp,
          };
        }
      );

      return {
        area_name: area.name,
        forecast: weather.forecast,
        forecast_timestamp: return_weathers.update_timestamp,
        forecast_valid_period: return_weathers.valid_period,
        traffic,
      };
    });

    return {
      success: true,
      message: `request successful`,
      data: data,
    };
  } catch (error) {
    return { success: false, message: "request failed", data: null };
  }
};
