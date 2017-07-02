import React from 'react';

export default class SignUp extends React.Component {
  render() {
    return(
      <div>
        <Nav/>
        <Body/>
        <Footer/>
      </div>
    );
  }
}


class Nav extends React.Component {
  render() {
    return(
      <nav className="lime darken-4">
        <div className="nav-wrapper">
          <a href="#" id="brand" className="brand-logo">PostIt</a>
          <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
          <ul className="right hide-on-med-and-down">
            <li><a href="#">About PostIt</a></li>
          </ul>
          <ul id="mobile-demo" className="side-nav">
            <li><a href="#">About PostIt</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

class Body extends React.Component {
  render() {
    return(
      <div>
        <div className="fixed-action-btn hide-on-med-and-up">
          <a className="btn-floating btn-large red" href="#signinform">
            <i className="large material-icons">lock_outline</i>
          </a>
        </div>
        <div>
          <div className="row">
            <div className="col s12 m6 l7 center">
              <h2 className="center">Why meet when you can PostIt?</h2>
              <div className="row">
                <div className="col s12 m12 l6">
                  <i className="large material-icons">people</i>
                  <h4>Create teams of all sizes</h4>
                </div>
                <div className="col s12 m12 l6">
                  <i className="large material-icons">perm_scan_wifi</i>
                  <h4>Send broadcast messages to team members</h4>
                </div>
                <div className="col s12 m12 l6">
                  <i className="large material-icons">done_all</i>
                  <h4>Get receipt notifications</h4>
                </div>
                <div className="col s12 m12 l6">
                  <i className="large material-icons">trending_up</i>
                  <h4>Achieve more in less time</h4>
                </div>
              </div>
            </div>
            <div id="signinform" className="col s12 m6 l5">
              <form className="signin-form">
                <div>
                  <h3 className="center">Sign In</h3>
                </div>
                <div>
                  <input type="text" name="email" placeholder="Email" />
                </div>
                <input type="text" name="password" placeholder="Password" />
                <div>
                </div>
                <button className="btn">Sign in</button>
                <br /><br />
                <div>
                  <input id="signedin" className="teal-text" type="checkbox" name="signedin" />
                  <label htmlFor="signedin">Keep me signed in</label>
                </div>
                <div>
                  <p>Don't have an account? <a href="#">Sign up</a></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Footer extends React.Component {
  render() {
      return (
      <footer className="page-footer lime darken-4">
        <div className="container">Built by Victor Idongesit</div>
        <div className="footer-copyright">    © Andela, 2017</div>
      </footer>
    );
  }
}
