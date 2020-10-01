import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { provider, authentication } from "firebase/config";
import { logoutBegin, loginBegin } from 'redux/actions/loginAction';
import "components/header/header-styles.scss";

const Header = ({ isLoggedIn, logout, login }) => {
  const handleAuthentication = () => {
    if (isLoggedIn) {
      // handle logout
      authentication.signOut().then(() => {
        logout();
      })
    } else {
      authentication.signInWithPopup(provider).then((result) => {
        const { user } = result;
        if(user) {
          const { uid, email, displayName, phoneNumber, photoURL} = user;
          login({
            uid, email, displayName, phoneNumber, photoURL
          });
        }
      });
    }
  };
  return (
    <header className="main-header">
      <div className="container">
        <div className="header-inner-wrap">
          <div className="logo-wrap">
            <Link to="/">Activity Tracker</Link>
          </div>
          <nav className="main-nav">
            <div className="menu-wrap">
              <ul className="nav-menu">
                <li>
                  <Link to="/create">Create</Link>
                </li>
                <li>
                  <Link to="/">List</Link>
                </li>
                <li>
                  <Link to='#' onClick={handleAuthentication}>
                    {isLoggedIn ? "LogOut" : "Login"}
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = ({ login }) => {
  return {
    ...login,
  };
};

const mapDispatchToProps = dispath => {
  return {
    logout() {
      dispath(logoutBegin());
    },
    login(user) {
      dispath(loginBegin(user));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
