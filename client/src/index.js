import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import {Route,BrowserRouter as Router,Switch} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose} from 'redux';
import Reducer from './reducers/index';
import Thunk from 'redux-thunk';


const store=createStore(Reducer,compose(applyMiddleware(Thunk)));

const routing=(
    <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/" component={App}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route render={()=>(
                        <div style={{color:"red",align:'center',position:"relative",transform:"translate(50%,50%)"}}>
                            <h1>404</h1>
                            <h3>PAGE NOT FOUND!!</h3>
                        </div>
                    )}/>
                </Switch>
            </Router>
    </Provider>
)
ReactDom.render(routing,document.getElementById("root"));

