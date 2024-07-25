import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
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
            <h3>{city.name}</h3>
          </Col>
        </Row>
        <Row className="city-sidebar-row">
          <Col xs={12} className="city-current-weather">
            <Card>
              <Card.Header>
                <Card.Title>Current Weather</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover>
                  <tbody>
                    {Object.keys(city.current).map((key) => (
                      <tr>
                        <td>{key}</td>
                        <td>{city.current[key]}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Col>
      <Col xs={8} className="city-historical-data">
        <h1>Historical Data</h1>
        {city.historical.data.map((historical) => (
          <Card>
            <Card.Header>
              <Card.Title>{historical.time}</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <tbody>
                  {Object.keys(historical).map((key) => (
                    <tr>
                      <td>{key}</td>
                      <td>{city.current[key]}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        ))}
      </Col>
    </Row>
  );
};

export default CityWeather;
