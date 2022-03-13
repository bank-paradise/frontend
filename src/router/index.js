import { Route, Routes } from "react-router";

import Login from "features/authentication/login.page";

export default function RootContainer() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
}
