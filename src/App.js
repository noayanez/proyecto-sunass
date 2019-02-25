import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AppPrimary from "./AppPrimary.js";
import Login from "./Login.js";

class App extends Component {

    constructor(){
        super();
        this.state = {
            isLogged: false,
            token: ''
        }
        this.handleChangeIsLogged = this.handleChangeIsLogged.bind(this);
        this.handleChangeToken = this.handleChangeToken.bind(this);
    }

    handleChangeIsLogged(flag, tokenBody) {
        this.setState({
            isLogged: flag,
            tokenBody: tokenBody
        })
    }

    handleChangeToken(token) {
        this.setState({
            token: token
        })
    }

    render() {
        if (this.state.isLogged) {
            return (<AppPrimary tokenBody={this.state.tokenBody} handleChangeIsLogged={this.handleChangeIsLogged} token={this.state.token} />)
        } else {
            return (
                <BrowserRouter>
                    <Switch>
                        <Route
                            component={(props) => <Login {...props} isLogged={this.state.isLogged} handleChangeIsLogged={this.handleChangeIsLogged} handleChangeToken={this.handleChangeToken} />}
                        />
                    </Switch>
                </BrowserRouter>
            )
        }
    }
}

export default App;
