import React, {Component, Suspense} from 'react';
import './App.css';
import Layout from './Hoc/layout/Layout'
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {Route, Switch, withRouter, Redirect} from 'react-router'
import {connect} from 'react-redux'
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from './store/actions/index'

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSingIn()
    }
    render() {

        const CheckOutPage = React.lazy(() => import('./containers/CheckOut/CheckOut'))
        const OrdersPage = React.lazy(() => import('./containers/Orders/Orders'))

        let routes = (
            <Switch>
                <Route path="/auth" component={Auth}/>
                <Route path="/" exact component={BurgerBuilder}/>
                <Redirect to='/'/>
            </Switch>
        )
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/checkout" render={() => {
                        return <Suspense fallback={<div>Loading...</div>}><CheckOutPage/></Suspense>
                    }}/>
                    <Route path="/orders" render={() => {
                        return <Suspense fallback={<div>Loading...</div>}><OrdersPage/></Suspense>
                    }}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/auth" component={Auth}/>
                    <Route path="/" exact component={BurgerBuilder}/>
                </Switch>
            )
        }
        return (
            <div className='App'>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSingIn: () => dispatch(actions.authCheckState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
