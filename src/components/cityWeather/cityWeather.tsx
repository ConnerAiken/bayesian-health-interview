import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import { CityWeatherProps } from "./cityWeather.types";
import "./cityWeather.scss";
import Button from "react-bootstrap/esm/Button";
import { useAppDispatch } from "../../app/redux/hooks";
import { handlePositionMove, handleRemove } from "../../app/redux/slices/weatherSlice";
import React from "react";

const CityWeather = (CityProps: CityWeatherProps) => {
  const dispatch = useAppDispatch();
  const { city } = CityProps;

  const handleMove = (direction: "up" | "down") => {
    dispatch(
      handlePositionMove({
        direction,
        city,
      }),
    );
  };

  const handleRemoveBtn = () => {
    dispatch(handleRemove(city.id));
  };

  return (
    <Row className="city" data-testid="city-weather-report">
      <Col xs={4} className="city-sidebar">
        <Row className="city-sidebar-row">
          <Col xs={12} className="city-information">
            <h3 data-testid={`city-weather-report-title-${city.id}`}>{city.name}</h3>
            <Button
              data-testid={`city-weather-report-move-up-${city.id}`}
              variant="primary"
              onClick={handleMove.bind(this, "up")}
            >
              Move Up
            </Button>
            &nbsp;
            <Button
              data-testid={`city-weather-report-move-down-${city.id}`}
              variant="secondary"
              onClick={handleMove.bind(this, "down")}
            >
              Move Down
            </Button>
            <Button
              data-testid={`city-weather-report-remove-${city.id}`}
              variant="danger"
              onClick={handleRemoveBtn}
            >
              Remove
            </Button>
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
                      <tr key={city.current + "-current-" + key}>
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
        {city.historical.map((historical) => (
          <React.Fragment key={"historical-" + historical.time}>
            <Table striped bordered hover size={"small"} className="historical-data-table">
              <tbody>
                <tr>
                  <td>Time</td>
                  <td>{historical.time}</td>
                </tr>
                {["temperature", "pressure", "winddirection", "humidity"].map((key) => (
                  <tr key={city.current + "-historical-" + key}>
                    <td>{key}</td>
                    <td>{city.current[key]}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <hr />{" "}
          </React.Fragment>
        ))}
      </Col>
    </Row>
  );
};

export default CityWeather;
