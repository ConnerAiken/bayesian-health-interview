const baseApiUrl = "https://bh-weather-data.s3.amazonaws.com"; // TODO: add env variable

export async function fetchStations() {
  const stations = await fetch(`${baseApiUrl}/stations.json`, {
    method: "GET",
  });

  return stations.json();
}
