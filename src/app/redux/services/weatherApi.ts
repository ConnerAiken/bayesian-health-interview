export const baseApiUrl = "https://bh-weather-data.s3.amazonaws.com"; // TODO: add env variable

export async function fetchStations() {
  const stations = await fetch(`${baseApiUrl}/stations.json`, {
    method: "GET",
  });

  return stations.json();
}

export async function fetchCityWeatherCurrent(cityId: string) {
  const stations = await fetch(`${baseApiUrl}/current/${cityId}.json`, {
    method: "GET",
  });

  return stations.json();
}

export async function fetchCityWeatherHistorical(cityId: string) {
  const stations = await fetch(`${baseApiUrl}/historical/${cityId}.json`, {
    method: "GET",
  });

  return stations.json();
}
