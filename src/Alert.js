import React, { useEffect } from "react";

const Alert = (props) => {
  const { msg, list, removeAlert } = props;

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);

  return (
    <React.Fragment>
      <p>{msg}</p>
    </React.Fragment>
  );
};

export default Alert;
