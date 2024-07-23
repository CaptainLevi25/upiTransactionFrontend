import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import React, { useEffect } from "react";
import BasicTabs from "./pages/Tabs";
import { useAuth } from "./Authprovider";

function App() {
  const {user}  = useAuth();
  
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            //localStorage.getItem("user") === null ? (
            user === null ? (
              <BasicTabs />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />

        <Route
          path="/"
          element={
           // localStorage.getItem("user") ? <Home /> : <Navigate to={"/login"} />
            user ? <Home /> : <Navigate to={"/login"} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
