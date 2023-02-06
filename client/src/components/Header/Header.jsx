import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";
import ProductForm from "../ProductForm/ProductForm";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="header-main">
      <h1 className="header-title">Task: CRUD Operation</h1>
      <Container>
        <Row className="row-header">
          <Col className="col-btn">
            <Button
              variant="primary"
              onClick={() => {
                navigate("/product");
              }}
              className="btn-add-prod"
            >
              Add Product
            </Button>
          </Col>
          <Col>
            {/* <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-1"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form> */}
            <SearchBox />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Header;
