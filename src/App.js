import React, { useState } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Auth from "./pages/auth/Auth";
import AppContext from "./context";


function App() {
  const [state, setState] = useState({
    users: [],
    currentUser: null
  });
  const dispatch = (actionType, payload) => {
    switch (actionType) {
      case 'LOGIN':
        setState({ ...state, currentUser: payload });
        return;
      case 'LOGOUT':
        setState({ ...state, currentUser: null });
        return;
      case 'REGISTER':
        setState({ ...state, users: [...state.users, payload] });
        return;
      default:
        return;
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Routes>
        <Route exact path="/" element={state.currentUser ? <Home /> : <Navigate to="/auth" replace={true} />} />
        <Route exact path="/auth" element={state.currentUser ? <Navigate to="/" replace={true} /> : <Auth />} replace={true} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
