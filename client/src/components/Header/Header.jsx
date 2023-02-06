import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";
import ProductForm from "../ProductForm/ProductForm";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="header-main">
      <h1 className="header-title">CRUD Product</h1>
      <Container>
        <Row className="row-header">
          <Col>
            <Button
              variant="primary"
              onClick={() => {
                navigate("/product");
              }}
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
