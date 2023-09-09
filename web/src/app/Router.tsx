import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Drag from "../pages/Drag";
import Infochannel from "../pages/Infochannel";
import Login from "../pages/Login";
import NotFound404 from "../pages/NotFound404";
import Schedules from "../pages/Schedules";
import ActionTrigger from "../pages/settings/ActionTrigger";
import CreateTag from "../pages/settings/CreateTag";
import Process from "../pages/settings/Process";
import Register from "../pages/settings/Register";
import ProtectedRoutes from "./ProtectedRoutes";
// import LoginScreen from "../pages/LoginScreen";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="schedule" element={<ProtectedRoutes component={<Schedules />} />} />
        <Route path="settings/process" element={<ProtectedRoutes component={<Process />} />} />
        <Route path="settings/process/createtag" element={<ProtectedRoutes component={<CreateTag />} />} />
        <Route path="settings/process/actiontrigger" element={<ProtectedRoutes component={<ActionTrigger />} />} />
        <Route path="settings/registration" element={<Register />} />
        <Route path="drag" element={<Drag />} />
        <Route path="protocols/infochannel" element={<ProtectedRoutes component={<Infochannel />} />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;