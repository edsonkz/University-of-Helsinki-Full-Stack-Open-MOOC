import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification[0]);
  const error = useSelector((state) => state.notification[1]);
  if (notification.length === 0) {
    return <></>;
  } else if (!error) {
    return <div className="notification"> {notification}</div>;
  } else {
    return <div className="notificationError"> {notification}</div>;
  }
};

export default Notification;
