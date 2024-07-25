import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CityWeatherProps } from "./cityWeather.types";
import "./cityWeather.scss";

const CityWeather = (CityProps: CityWeatherProps) => {
  const { city } = CityProps;
  console.log(city);
  return (
    <Row className="city">
      <Col xs={4} className="city-sidebar">
        <Row className="city-sidebar-row">
          <Col xs={12} className="city-information">
            <p>{city.name}</p>
          </Col>
        </Row>
        <Row className="city-sidebar-row">
          <Col xs={12} className="city-current-weather">
            <p>Current Weather</p>
          </Col>
        </Row>
      </Col>
      <Col xs={8} className="city-historical-data">
        <h1>Historical Data</h1>
      </Col>
    </Row>
  );
};

export default CityWeather;
