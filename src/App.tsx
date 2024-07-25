import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "./components/header/header";
import CityWeather from "./components/cityWeather/cityWeather";
import "./App.scss";
import { useAppSelector } from "./app/redux/hooks";
import { selectCities } from "./app/redux/slices/weatherSlice";
import { store } from "./app/redux/store";

function App() {
  const cities = useAppSelector(selectCities);

  store.subscribe(() => {
    const state = store.getState();
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  });

  return (
    <Container id="app-container">
      <Header />
      <Row id="app-content">
        <Col xs={12}>
          {cities.map((city) => (
            <CityWeather key={city.id} city={city} />
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
