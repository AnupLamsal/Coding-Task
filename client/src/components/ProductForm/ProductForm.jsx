import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct, reset } from "../../features/products/productSlice";
import Alert from "../Alert";

function ProductForm() {
  const [productName, setProductName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productItems = useSelector(state => state.product);
  const { isSuccess, isLoading, message, isError } = productItems;

  const submitHandler = e => {
    e.preventDefault();

    dispatch(
      createProduct({
        product_name: productName,
        category_name: categoryName,
        description,
        created_by: createdBy,
        status,
      })
    ).then(value => {
      if (!value.error) {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    });
  };

  useEffect(() => {
    dispatch(reset());
  }, []);

  return (
    <>
      <Container className="my-3" style={{ width: "70%" }}>
        <Button variant="secondary" onClick={() => navigate("/")}>
          Go Back
        </Button>
        <h1 className="text-center">Add Product Details</h1>
        {!isLoading && isError && !isSuccess && (
          <Alert variant="danger" message={message} />
        )}
        {!isLoading && isSuccess && (
          <Alert variant="success" message={message} />
        )}
        <Form onSubmit={submitHandler}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="productName" className="py-1">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="productName"
                  value={productName}
                  onChange={e => setProductName(e.target.value)}
                  placeholder="Enter name"
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="categoryName" className="py-1">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="categoryName"
                  value={categoryName}
                  onChange={e => setCategoryName(e.target.value)}
                  placeholder="Enter category name"
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="createdBy" className="py-1">
                <Form.Label>Created By</Form.Label>
                <Form.Control
                  type="text"
                  name="createdBy"
                  value={createdBy}
                  onChange={e => setCreatedBy(e.target.value)}
                  placeholder="Created by"
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="status" className="py-1">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  placeholder="Enter status"
                >
                  <option value=""></option>
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Form.Group controlId="description" className="py-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                style={{
                  resize: "none",
                  height: "7rem",
                }}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Enter description"
              ></Form.Control>
            </Form.Group>
          </Row>
          <div className="btn-submit-product text-center mt-3">
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default ProductForm;
