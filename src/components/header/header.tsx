import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./header.scss";

const Header = () => {
  return (
    <Row id="app-header">
      <Col xs={7} id="app-title">
        <h1>Weather Report 2000</h1>
      </Col>
      <Col xs={{ span: 4, offset: 1 }} id="app-actions">
        <h1>Add City Section</h1>
      </Col>
    </Row>
  );
};

export default Header;
