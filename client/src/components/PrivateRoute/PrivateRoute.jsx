import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

// We will be exporting the API_URL from App.js in a later step
import { localAPI } from '../../utils/apiUtils';
import { API_URL } from '../../config';

class PrivateRoute extends Component {
  state = {
    isAuthenticating: true,
    isAuthenticated: false,
    user: null,
  };

  componentDidMount() {
    // Send an Auth check request to the server
    // don't forget to set axios to send requests withCredentials
    // it allows for cookies to be passed to backend
    let token = sessionStorage.getItem('authToken')
    axios
      // .get(`${localAPI}auth/check-auth`, { headers: {
      .get(`${API_URL}/auth/check-auth`, { headers: {
        Authorization: `Bearer ${token}`
    }})
      .then((res) => {
        this.setState({
          isAuthenticating: false,
          isAuthenticated: true,
          user: res.data,
        });
      })
      .catch(() => {
        this.setState({
          isAuthenticating: false,
          isAuthenticated: false,
        });
      });
  }

  render() {
    const { component: Component, ...rest } = this.props;
    // Return a Route with all original props passed to it
    // and a custom render prop that waits for component to
    // finish authenticating and for successful auth
    // render component and also pass user object provided by server as a prop
    // otherwise redirect back to login page while pasing it
    // a current route so it can redirect back to page you came from
    return (
      <Route
        {...rest}
        render={(props) => {
          // While authenticating, don't show anything
          // alternatively this could be a loading indicator
          if (this.state.isAuthenticating) return null;
          return this.state.isAuthenticated ? (
            <Component user={this.state.user} {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          );
        }}
      />
    );
  }
}

export default PrivateRoute;