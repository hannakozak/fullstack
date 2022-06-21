import React, { useEffect } from "react";
import Notification from "../components/Notification";
import { User } from "../components/User";
import LoginForm from "../components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../features/userSlice";
import { getUsers, usersSelector } from "../features/usersSlice";
import {
  addNotification,
  removeNotification,
} from "../features/notificationSlice";
import { v4 as uuidv4 } from "uuid";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";

export const Users = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector(userSelector);
  const { users } = useSelector(usersSelector);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const notify = (message, type = "info") => {
    const id = uuidv4();
    dispatch(addNotification({ message, type, id }));
    setTimeout(() => dispatch(removeNotification(id)), 3000);
  };

  if (!authUser.name) {
    return (
      <>
        <Notification />
        <LoginForm notify={notify} />
      </>
    );
  }
  return (
    <>
      <Header />
      <h1>Users</h1>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td>blogs created</td>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <Link to={`/users/${user.id}`}>
                <User user={user} />
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
