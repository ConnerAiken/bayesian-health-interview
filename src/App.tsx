import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "./components/header/header";
import City from "./components/city/city";
import "./App.scss";

function App() {
  return (
    <Container id="app-container">
      <Header />
      <Row id="app-content">
        <Col xs={12}>
          {[1, 2, 3, 4, 5].map((i) => (
            <City />
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
