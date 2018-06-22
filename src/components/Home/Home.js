import React from 'react';

import './Home.css';

import Login from '../../containers/Login/Login';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showLogin: false,
    }

    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this.registerPage = this.registerPage.bind(this);
  };

  toggleLoginModal(event) {
    const loginModal = document.getElementById('loginModal');
    const loginButton = document.getElementById('loginButton');

    if (event.target === loginModal || event.target === loginButton) {
      this.setState({ showLogin: !this.state.showLogin });
    }
  }

  registerPage() {
    this.props.history.push('/register');
  }
  render() {
    return (
      <div id="home">
        {
          this.state.showLogin
            ?
            <div onClick={this.toggleLoginModal} id="loginModal">
              <Login />
            </div>
            : null
        }
        <div id="homeImage">
          <div className="homeTitle">fitbyte</div>
        </div>
        <div id="homeMenu">
          <button onClick={this.toggleLoginModal} id="loginButton">Login</button>
          <button onClick={this.registerPage}>Register</button>
        </div>
      </div>
    )
  }
}

export default Home;