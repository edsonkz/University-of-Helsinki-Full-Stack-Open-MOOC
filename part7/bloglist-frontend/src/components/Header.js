import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../reducers/userReducer";

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
          {user.name} logged-in <button onClick={handleLogout}>logout</button>
        </li>
      </ul>
      <h1>blog app</h1>
    </div>
  );
};

export default Header;
