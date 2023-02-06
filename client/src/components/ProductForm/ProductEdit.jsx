import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductById,
  updateProduct,
  getProducts,
  reset,
} from "../../features/products/productSlice";
import Alert from "../Alert";

function ProductEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const productId = params.id;

  const [productName, setProductName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [status, setStatus] = useState("");

  const productItem = useSelector(state => state.product);
  const { isSuccess, isLoading, message, isError, products } = productItem;

  useEffect(() => {
    if (!products.product_name || products._id !== productId) {
      dispatch(reset());
      dispatch(getProductById(productId));
    } else {
      setProductName(products.product_name);
      setCategoryName(products.category_name);
      setDescription(products.description);
      setCreatedBy(products.created_by);
      setStatus(products.status);
    }
  }, [productId, dispatch, products]);

  const submitHandler = e => {
    e.preventDefault();

    let productData = {
      product_name: productName,
      category_name: categoryName,
      description,
      created_by: createdBy,
      status,
    };

    dispatch(updateProduct({ id: productId, productData })).then(value => {
      if (!value.error) {
        setTimeout(() => {
          dispatch(getProducts());
          navigate("/");
        }, 2000);
      }
    });
  };

  return (
    <>
      <Container className="my-3" style={{ width: "70%" }}>
        <Button
          variant="secondary"
          onClick={() => {
            dispatch(reset());
            navigate("/");
          }}
        >
          Go Back
        </Button>
        <h1 className="text-center">Edit Product Detail</h1>

        {!isLoading && isError && message !== "Product updated" && (
          <Alert variant="danger" message={message} />
        )}
        {!isLoading && isSuccess && message === "Product updated" && (
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
              Edit
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default ProductEdit;
