import "babel-polyfill";

import 'typeface-roboto'
import 'material-design-icons/iconfont/material-icons.css'
import 'material-design-icons/iconfont/MaterialIcons-Regular.eot'
import 'material-design-icons/iconfont/MaterialIcons-Regular.ijmap'
import 'material-design-icons/iconfont/MaterialIcons-Regular.svg'
import 'material-design-icons/iconfont/MaterialIcons-Regular.ttf'
import 'material-design-icons/iconfont/MaterialIcons-Regular.woff'
import 'material-design-icons/iconfont/MaterialIcons-Regular.woff2'

import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import AppMenu from "./AppMenu"
import HelloWorld from "./HelloWorld"
import Other from "./Other"

const app = (
    <Router>
        <div>
            <AppMenu/>
            <Switch>
                <Route path='/HelloWorld' component={HelloWorld}/>
                <Route path='/Other' component={Other}/>
                <Redirect from='/' to='HelloWorld'/>
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(app, document.getElementById("mount"));