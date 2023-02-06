import { useEffect } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductItem.css";
import moment from "moment";
import {
  getProducts,
  deleteProduct,
  reset,
} from "../../features/products/productSlice";

function ProductItem() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const keyword = params.keyword;

  const { isError, isSuccess, isLoading, message, products } = useSelector(
    state => state.product
  );

  useEffect(() => {
    dispatch(getProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <Table striped bordered hover className="table-product">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Category</th>
            <th className="hide-md">Description</th>
            <th className="hide-md">Created At</th>
            <th className="hide-sm">Status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {isLoading || !isSuccess ? (
            <Spinner />
          ) : (
            products.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.product_name}</td>
                <td>{item.category_name}</td>
                <td className="hide-md">{item.description}</td>
                <td className="hide-md">
                  {moment(item.createdAt).format("YYYY-MM-DD")}
                </td>
                <td className="hide-sm">{item.status}</td>
                <td className="text-center">
                  <Button
                    variant="success"
                    className="edit-prod"
                    onClick={() => navigate(`/product/edit/${item._id}`)}
                  >
                    Edit
                  </Button>
                </td>
                <td className="text-center">
                  <Button
                    variant="danger"
                    className="del-prod"
                    onClick={() => dispatch(deleteProduct(item._id))}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  );
}

export default ProductItem;
