import { Spinner as Spin } from "react-bootstrap";

function Spinner() {
  return (
    <>
      <Spin animation="border" variant="success" />
      <Spin animation="border" variant="danger" />
      <Spin animation="border" variant="warning" />
    </>
  );
}

export default Spinner;
