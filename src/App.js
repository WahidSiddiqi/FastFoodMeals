// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { v4 as uuid } from "uuid";

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from "./components/shared/AutoDismissAlert/AutoDismissAlert";
import Header from "./components/shared/Header";
import RequireAuth from "./components/shared/RequireAuth";
import Home from "./components/Home";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import SignOut from "./components/auth/SignOut";
import ChangePassword from "./components/auth/ChangePassword";
import MealSummaryPage from "./components/pages/MealSummary";
import AddItemToMealPage from "./components/pages/AddItemToMeal";
import DeleteItemFromMealPage from "./components/pages/DeleteItemFromMeal";
import EditItemInMealPage from "./components/pages/EditItemInMeal";

const App = () => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [msgAlerts, setMsgAlerts] = useState([]);

  useEffect(() => {
    try {
      const cachedUser = window.localStorage.getItem("user");
      const cachedJsonUser = JSON.parse(cachedUser);
      if (cachedJsonUser) {
        setUserLoading(false);
        setUser(cachedJsonUser);
      }
    } catch (e) {
      console.error("cannot load user from local storage");
    }
  }, []);

  console.log("user in app", user);
  console.log("message alerts", msgAlerts);
  const clearUser = () => {
    console.log("clear user ran");
    setUser(null);
  };

  const deleteAlert = (id) => {
    setMsgAlerts((prevState) => {
      return prevState.filter((msg) => msg.id !== id);
    });
  };

  const msgAlert = ({ heading, message, variant }) => {
    const id = uuid();
    setMsgAlerts(() => {
      return [{ heading, message, variant, id }];
    });
  };

  return (
    <Fragment>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home msgAlert={msgAlert} user={user} />} />
        <Route
          path="/sign-up"
          element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
        />
        <Route
          path="/sign-in"
          element={
            <SignIn
              msgAlert={msgAlert}
              setUser={setUser}
              setUserLoading={setUserLoading}
            />
          }
        />
        <Route
          path="/sign-out"
          element={
            <RequireAuth user={user} userLoading={userLoading}>
              <SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
            </RequireAuth>
          }
        />
        <Route
          path="/change-password"
          element={
            <RequireAuth user={user} userLoading={userLoading}>
              <ChangePassword msgAlert={msgAlert} user={user} />
            </RequireAuth>
          }
        />

        <Route
          path="/meal-summary"
          element={
            <RequireAuth user={user} userLoading={userLoading}>
              <MealSummaryPage user={user} />
            </RequireAuth>
          }
        />
        <Route
          path="/add-item-to-meal"
          element={
            <RequireAuth user={user} userLoading={userLoading}>
              <AddItemToMealPage user={user} />
            </RequireAuth>
          }
        />
        <Route
          path="/delete-item-from-meal"
          element={
            <RequireAuth user={user} userLoading={userLoading}>
              <DeleteItemFromMealPage user={user} />
            </RequireAuth>
          }
        />
        <Route
          path="/edit-item-in-meal"
          element={
            <RequireAuth user={user} userLoading={userLoading}>
              <EditItemInMealPage user={user} />
            </RequireAuth>
          }
        />
      </Routes>
      {msgAlerts.map((msgAlert) => (
        <AutoDismissAlert
          key={msgAlert.id}
          heading={msgAlert.heading}
          variant={msgAlert.variant}
          message={msgAlert.message}
          id={msgAlert.id}
          deleteAlert={deleteAlert}
        />
      ))}
    </Fragment>
  );
};

export default App;
