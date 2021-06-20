import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import reportWebVitals from "./reportWebVitals";

// ReactDOM.render(
// 	<Auth0Provider
// 		domain='dev-kp2hitg8.auth0.com'
// 		clientId='UsT7DA2xuGcC0zxdVabYmt58G4EYxxqf'
// 		redirectUri={window.location.origin}>
// 		<App />
// 	</Auth0Provider>,
// 	document.getElementById("root")
// );

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
