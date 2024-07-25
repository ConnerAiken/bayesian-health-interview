import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import { CityWeatherProps } from "./cityWeather.types";
import "./cityWeather.scss";
import Button from "react-bootstrap/esm/Button";
import { useAppDispatch } from "../../app/redux/hooks";
import { handlePositionMove } from "../../app/redux/slices/weatherSlice";

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
  return (
    <Row className="city">
      <Col xs={4} className="city-sidebar">
        <Row className="city-sidebar-row">
          <Col xs={12} className="city-information">
            <h3>{city.name}</h3>
            <Button variant="primary" onClick={handleMove.bind(this, "up")}>
              Move Up
            </Button>
            &nbsp;
            <Button variant="secondary" onClick={handleMove.bind(this, "down")}>
              Move Down
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
          <>
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
          </>
        ))}
      </Col>
    </Row>
  );
};

export default CityWeather;
