import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminUsers.css";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      });
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        });
        fetchUsers();
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-users-container">
      <h2>
        <i className="fas fa-users-cog"></i> All Users
      </h2>
      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>
                <i className="fas fa-user"></i> Name
              </th>
              <th>
                <i className="fas fa-envelope"></i> Email
              </th>
              <th>
                <i className="fas fa-user-shield"></i> Role
              </th>
              <th>
                <i className="fas fa-cogs"></i> Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  {u.isAdmin ? (
                    <span className="badge admin">Admin</span>
                  ) : (
                    <span className="badge user">User</span>
                  )}
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteUser(u._id)}
                  >
                    <i className="fas fa-trash-alt"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersPage;
