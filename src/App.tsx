import './App.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() { 
  return (
    <Container id="app-container">
      <Row id="app-header">
        <Col xs={8} id="app-title" style={{backgroundColor: 'grey'}}>
          <h1>Weather Report 2000</h1>
        </Col>
        <Col xs={4} id="app-actions" style={{backgroundColor: 'white'}}>
          <h1>Add City Section</h1>
        </Col>
      </Row>
      <Row id="app-content" style={{backgroundColor: 'yellow'}}> 
        <Col xs={12}>
          {[1, 2, 3, 4, 5].map((i) => (
              <Row className="city"> 
                <Col xs={4} className="city-sidebar" style={{backgroundColor: 'green'}}>
                  <Row>
                    <Col xs={12} className="city-information">
                      <p>City {i}</p>
                    </Col>
                    <Col xs={12} className="city-current-weather">
                      <p>Current Weather</p>
                    </Col>
                  </Row>
                </Col>
                <Col xs={8} className="city-historical-data" style={{backgroundColor: 'blue'}}>
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
