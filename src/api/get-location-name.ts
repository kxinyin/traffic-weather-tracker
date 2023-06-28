const GEOCODE_BASE_URL = process.env.REACT_APP_GOOGLE_GEOCODE_API_URL;
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export const getLocationName = async (param: {
  lat: number;
  long: number;
}): Promise<string> => {
  const geo_response = await fetch(
    `${GEOCODE_BASE_URL}?latlng=${param.lat},${param.long}&key=${GOOGLE_API_KEY}`,
    { method: "GET" }
  );

  const geo_json = await geo_response.json();

  if (!geo_response.ok) return "";

  const result = geo_json.results.find((each: { types: Array<string> }) =>
    each.types.includes("neighborhood")
  );

  if (!result) return "";

  const data = result.address_components.find(
    (each: { types: Array<string> }) => each.types.includes("neighborhood")
  );

  return data.long_name;
};
