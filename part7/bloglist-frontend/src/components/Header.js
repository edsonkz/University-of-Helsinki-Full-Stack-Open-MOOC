import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../reducers/userReducer";
import { Button } from "react-bootstrap";

import "./style.css";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <ul className="header">
        <li className="nav">
          <Link to={`/`}>blogs</Link>
        </li>
        <li className="nav">
          <Link to={`/users`}>users</Link>
        </li>
        <li className="nav">
          {user.name} logged-in <Button onClick={handleLogout}>logout</Button>
        </li>
      </ul>
      <h1>Blog App</h1>
      <hr />
    </div>
  );
};

export default Header;
