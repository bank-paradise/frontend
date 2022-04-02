import Login from "features/authentication/login.page";
import Register from "features/authentication/register.page";
import { Route, Routes } from "react-router";

export default function AuthenticationRouter() {
  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
