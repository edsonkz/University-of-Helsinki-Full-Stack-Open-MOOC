import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import userService from "../services/users";

const Users = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    const getUsers = async () => {
      const data = await userService.getAll();
      setUsers(data);
    };
    getUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {users ? (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th style={{ fontWeight: "bold" }}>blogs created</th>
            </tr>
            {users.map((user) => (
              <tr key={user.id}>
                <th>
                  <Link to={`/users/${user.id}`} state={{ user }}>
                    {user.name}
                  </Link>
                </th>
                <th>{user.blogs.length}</th>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <>No users found...</>
      )}
    </div>
  );
};

export default Users;
