import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { Users } from "./views/Users";
import { useSelector } from "react-redux";
import { userSelector } from "./features/userSlice";
import LoginForm from "./components/LoginForm";
import { UserView } from "./views/UserView";

export const App = () => {
  const { authUser } = useSelector(userSelector);
  return <>{authUser ? <AuthApp /> : <UnAuthApp />}</>;
};

const AuthApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/:id" element={<UserView />} />
    </Routes>
  );
};

const UnAuthApp = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
    </Routes>
  );
};
