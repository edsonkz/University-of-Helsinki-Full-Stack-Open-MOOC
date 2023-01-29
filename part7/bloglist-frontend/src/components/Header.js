import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logoutUser } from "../reducers/userReducer";

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
      <h2>blogs</h2>
      <p>
        {user.name} logged-in <button onClick={handleLogout}>logout</button>
      </p>
    </div>
  );
};

export default Header;
