import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Firebase from 'firebase'
import { Router, Route, Redirect, browserHistory, Link, IndexRoute } from 'react-router'
import { Grid, Row, Col, Panel } from 'react-bootstrap'
import NavBar from './components/navbar'
import SideNav from './components/sidenav'
const ref = new Firebase('https://sms-react.firebaseio.com/');

class App extends Component{
    render() {
        return (
            <div>
                <NavBar />
                <SideNav />
                <div className="app-content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

// Redirects user to login page if is not Authenticated
function requireAuth(nextState, replace) {
    var user = ref.getAuth();
    if (!user) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        });
    }
}

function unAuth(nextState, replace) {
    var user = ref.getAuth();
    if (user) {
        replace({
            pathname: '/',
            state: { nextPathname: nextState.location.pathname }
        });
    }
}

import Contacts from './pages/Contacts'
import History from './pages/History'
import AccountProfile from './pages/Account'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Payment from './pages/Payment'
import ResetPassword from './pages/ResetPassword'
const routes = (
    <Router>
        <Route path="login" component={Login} onEnter={unAuth} />
        <Route path="signup" component={Signup} onEnter={unAuth} />
        <Route path="/payment" component={Payment} />
        <Route path="reset-password" component={ResetPassword} onEnter={unAuth} />
        <Route path="/" component={App} onEnter={requireAuth}>
            <IndexRoute component={Contacts} />
            <Route path="/history" component={History} />
            <Route path="/account" component={AccountProfile} />
            <Route path="/upload" />
            <Route path="/image" />
            <Route path="/send" />
        </Route>
    </Router>
)


ReactDOM.render(<Router history={browserHistory}>{routes}</Router>, document.getElementById('app'));
