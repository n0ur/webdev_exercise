import { useCallback, useEffect, useState } from "react";
import AddUsers from "./AddUsers";
import RemoveUsers from "./RemoveUsers";
import Skills from "../Skills";
import "./Users.css";

const UsersTable = ({ children }) => (
  <div className="users-table">{children}</div>
);

const UsersTableHeader = () => (
  <div className="users-table__row">
    <div className="users-table__col-header">Id</div>
    <div className="users-table__col-header">Name</div>
  </div>
);

const UserRow = ({ id, name }) => (
  <div className="users-table__row">
    <div>{id}</div>
    <div>{name}</div>
  </div>
);

const fetchUsers = async () => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users`);
  const { items } = await response.json();
  return items;
};

const UsersActions = ({ children }) => (
  <div className="users-actions">{children}</div>
);

export default function Users() {
  const [users, setUsers] = useState([]);
  // for the users in the select box
  const [userList, setUserList] = useState([]);
  const loadUsers = useCallback(() => {
    fetchUsers().then((users) => {
      setUsers(users);
      setUserList(users);
    })
  }, []);
  useEffect(loadUsers, [loadUsers]);
  return (
    <div>
      <Skills userList={userList} onFilter={setUsers} />
      <UsersTable>
        <UsersTableHeader />
        {users.map((user) => (
          <UserRow key={user.id} {...user} />
        ))}
      </UsersTable>
      <UsersActions>
        <AddUsers refetch={loadUsers} />
        <RemoveUsers refetch={loadUsers} />
      </UsersActions>
    </div>
  );
}
