import "./common.d.ts";
import * as React from "react";
import * as ReactDOM from "react-dom";
import Main from "./pages/main/index";
import Second from "./pages/second/loadabale";
import CreateItinerary from "./pages/createItinerary";
import {HashRouter, Route} from "react-router-dom";
import "./index.scss";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../redux/reducers/index.js";
import thunk from "redux-thunk";
import Header from "./components/header/index";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
// add a push to trigger jenkins build test9
ReactDOM.render(
    <Provider store={store}>
    <HashRouter>
        <div styleName="wrap">
            <Header/>
            <Route exact path="/" component={Main}/>
            <Route path="/second" component={Second}/>
            <Route path="/createItinerary" component={CreateItinerary}/>
        </div>
    </HashRouter>
    </Provider>
    ,
    document.getElementById("appContainer"),
);
