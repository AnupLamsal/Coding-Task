import { useState, useEffect } from "react";
import { Alert as AlertUser } from "react-bootstrap";

function Alert({ variant, message }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeID = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => {
      clearTimeout(timeID);
    };
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div className="text-center">
      <AlertUser variant={variant}>{message}</AlertUser>
    </div>
  );
}

export default Alert;
