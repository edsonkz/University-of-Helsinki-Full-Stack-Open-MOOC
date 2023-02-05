import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

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
      <h2>Users</h2>
      {users ? (
        <Table>
          <tbody>
            <tr>
              <th>username</th>
              <th style={{ fontWeight: "bold" }}>blogs created</th>
            </tr>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`} state={{ user }}>
                    {user.name}
                  </Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <>No users found...</>
      )}
    </div>
  );
};

export default Users;
