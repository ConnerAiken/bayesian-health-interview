import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./header.scss";

const Header = () => {
  return (
    <Row id="app-header">
      <Col xs={7} id="app-title">
        <h1>Weather Report 2000</h1>
      </Col>
      <Col xs={{ span: 4, offset: 1 }} id="app-actions">
        <Row>
          <Col xs={8} id="app-actions-inputs">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" id="add-city-input" />
          </Col>
          <Col xs={4} id="app-actions-btns" className="flex align-items-end justify-content-center">
            <Button variant="primary">Add</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Header;
