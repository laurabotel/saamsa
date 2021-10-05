"use strict";
exports.__esModule = true;
/* eslint-disable @typescript-eslint/no-empty-function */
var React = require("react");
require("../scss/LoginPage.scss");
var LoginPage = function (_a) {
    var 
    // loginStatus, 
    // changeLoginStatus, 
    loginAttempt = _a.loginAttempt, 
    // changeAttempt, 
    loginButton = _a.loginButton, signUp = _a.signUp;
    return (React.createElement("div", { className: "loginWrapper" },
        React.createElement("div", { className: "loginTitle" },
            React.createElement("h1", { className: "heading" }, "Saamsa")),
        React.createElement("div", { id: "usernameAndPasswordWrapper" },
            React.createElement("input", { name: "username", placeholder: "username", id: "username", autoComplete: "off" }),
            React.createElement("input", { name: "password", placeholder: "password", id: "password", autoComplete: "off", type: "password" })),
        React.createElement("div", { id: "buttonsDiv" },
            React.createElement("button", { type: "button", id: "loginBtn", onClick: loginButton, value: "Log-In" }, "Log In"),
            React.createElement("button", { id: "forgotPassword" }, " Forgot password? "),
            React.createElement("div", { id: "loginAttemptMessage" }, loginAttempt)),
        React.createElement("div", { id: "signUpArea" },
            React.createElement("h2", { id: "noAccount" }, "Don't have an account? "),
            React.createElement("button", { type: "button", onClick: signUp, id: "signUpBtn", value: "Sign-Up" }, "Sign up"))));
};
exports["default"] = LoginPage;
