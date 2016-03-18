import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Firebase from 'firebase'
import { Router, Route, browserHistory, Link, IndexRoute } from 'react-router'
import { Grid, Row, Col } from 'react-bootstrap'
import NavBar from './components/navbar'
import SideNav from './components/sidenav'
const ref = new Firebase('https://sms-react.firebaseio.com/');

class App extends Component{
    render() {
        return (
            <div>
                <NavBar />
                <Grid>
                    <Row>
                        <SideNav />
                        <Col md={8}>{this.props.children}</Col>
                    </Row>
                </Grid>
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
import Login from './pages/Login'
const routes = (
    <Router>
        <Route path="login" component={Login} onEnter={unAuth}/>
        <Route path="/" component={App}>
            <IndexRoute component={Contacts} onEnter={requireAuth}/>
        </Route>
    </Router>
)

ReactDOM.render(<Router history={browserHistory}>{routes}</Router>, document.getElementById('app'));
