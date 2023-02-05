import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = () => {
  const notification = useSelector((state) => state.notification[0]);
  const error = useSelector((state) => state.notification[1]);
  if (notification.length === 0) {
    return <></>;
  } else if (!error) {
    return <Alert variant="success"> {notification}</Alert>;
  } else {
    return <Alert variant="danger"> {notification}</Alert>;
  }
};

export default Notification;
