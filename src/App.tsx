import "./App.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  return (
    <Container id="app-container">
      <Row id="app-header">
        <Col xs={7} id="app-title">
          <h1>Weather Report 2000</h1>
        </Col>
        <Col xs={{ span: 4, offset: 1 }} id="app-actions">
          <h1>Add City Section</h1>
        </Col>
      </Row>
      <Row id="app-content">
        <Col xs={12}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Row className="city">
              <Col xs={4} className="city-sidebar">
                <Row className="city-sidebar-row">
                  <Col xs={12} className="city-information">
                    <p>City {i}</p>
                  </Col>
                </Row>
                <Row className="city-sidebar-row">
                  <Col xs={12} className="city-current-weather">
                    <p>Current Weather</p>
                    <p>Current Weather</p>
                    <p>Current Weather</p>
                  </Col>
                </Row>
              </Col>
              <Col xs={8} className="city-historical-data">
                <h1>Historical Data</h1>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
