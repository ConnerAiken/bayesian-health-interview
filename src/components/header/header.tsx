import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./header.scss";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks";
import {
  addCityToDashboard,
  initializeWeatherDashboard,
  selectStations,
  selectCities,
} from "../../app/redux/slices/weatherSlice";

const Header = () => {
  const citySelectRef = useRef<HTMLSelectElement>(null);
  const dispatch = useAppDispatch();
  const stations = useAppSelector(selectStations);
  const cities = useAppSelector(selectCities);

  const handleCityAdd = () => {
    dispatch(addCityToDashboard(citySelectRef.current?.value ?? ""));
  };

  useEffect(() => {
    dispatch(initializeWeatherDashboard());
  }, []);

  return (
    <Row id="app-header">
      <Col xs={7} id="app-title">
        <h1>Weather Report 2000</h1>
      </Col>
      <Col xs={{ span: 4, offset: 1 }} id="app-actions">
        <Row>
          <Col xs={8} id="app-actions-inputs">
            {stations.length > 0 ? (
              <Form.Select id="add-city-input" ref={citySelectRef}>
                <option>Open to select a city</option>
                {stations
                  .filter((station) => {
                    return !cities.find((city) => city.id === station.id);
                  })
                  .map((station) => (
                    <option value={station.id}>{station.name}</option>
                  ))}
              </Form.Select>
            ) : (
              <p>Loading...</p>
            )}
          </Col>
          <Col xs={4} id="app-actions-btns" className="flex align-items-end justify-content-center">
            <Button variant="primary" onClick={handleCityAdd}>
              Add
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Header;
