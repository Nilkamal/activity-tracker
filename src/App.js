import React, { useEffect } from "react";
import { connect } from "react-redux";
import { authentication } from "firebase/config";
import Header from "components/header/header-component";
import { BrowserRouter, Route } from "react-router-dom";
import SaveActivity from "pages/save-activity/save-activity-component";
import ListActivity from "pages/list-activity/list-activity-component";
import "App.css";
import {  loginBegin } from "redux/actions/loginAction";

function App({ isLoggedIn, login }) {
  useEffect(() => {
    authentication.onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        login({
          email: user.email,
          displayName: user.displayName,
          phoneNumber: user.phoneNumber,
          uid: user.uid,
        });
        // ...
      } else {
        // User is signed out.
        // ...
        console.log("user is not logged in");
      }
    });
  },[]);
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Route
          path="/create"
          render={(props) => (isLoggedIn ? <SaveActivity {...props}/> : <h1>Please login</h1>)}
        />
        <Route
          exact
          path="/"
          render={(props) => (isLoggedIn ? <ListActivity {...props}/> : <h1>Please login</h1>)}
        />
        <Route
          exact
          path="/edit/:id"
          render={(props) => (isLoggedIn ? <SaveActivity {...props} /> : <h1>Please login</h1>)}
        />
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = ({ login }) => {
  return {
    isLoggedIn: login.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login(user) {
      dispatch(loginBegin(user));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
