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
            token: '',
            hostname: 'http://179.43.88.86:8080' //HAY QUE AÑADIR UN HOSTNAME PARA QUE FUNCIONE LA APLICACION WEB
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
            return (<AppPrimary tokenBody={this.state.tokenBody} handleChangeIsLogged={this.handleChangeIsLogged} token={this.state.token} hostname={this.state.hostname}/>)
        } else {
            return (
                <BrowserRouter>
                    <Switch>
                        <Route
                            component={(props) => <Login {...props} isLogged={this.state.isLogged} handleChangeIsLogged={this.handleChangeIsLogged} handleChangeToken={this.handleChangeToken} hostname={this.state.hostname}/>}
                        />
                    </Switch>
                </BrowserRouter>
            )
        }
    }
}

export default App;
