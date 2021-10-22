import React from 'react';
import App from './App.js';
import AppMode from './AppMode.js'
import ErrorBox from './ErrorBox.js';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.emailError = React.createRef();
        this.passwordError = React.createRef();
        this.email = React.createRef();
        this.password = React.createRef();
        this.state = {emailValid: true, 
                      passwordValid: true};
    }

    componentDidUpdate(prevProps) {
        if (!this.state.passwordValid) {
            this.password.current.value = "";
            this.passwordError.current.focus();
        }
        if (!this.state.emailValid) {
            this.email.current.value = "";
            this.emailError.current.focus();
        } 
    } 

    handleSubmit = (e) => {
        e.preventDefault();
         //Is the email field valid
         const eValid = !this.email.current.validity.typeMismatch && 
                          !this.email.current.validity.valueMissing;
         //Is the password field valid?
         const pValid = !this.password.current.validity.patternMismatch && 
                            !this.password.current.validity.valueMissing;
        if (eValid && pValid) {
            this.props.setMode(AppMode.FEED);
            this.props.setUserId(this.email.current.value);
        } else { //at least one field is invalid--trigger re-render
            this.setState({emailValid: eValid,
                passwordValid: pValid});
        }
    }

    render() {
        return(
            <div id="loginPage" className="mode-page">
                <h1 className="mode-page-header">Log In</h1>

                <ErrorBox 
                emailValid={this.state.emailValid}
                passwordValid={this.state.passwordValid}
                emailError={this.emailError}
                passwordError={this.passwordError}
                />

                <form id="loginForm" className="centered" 
                    onSubmit={this.handleSubmit} noValidate>
                    <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:<br/>
                        <input id="email" type="email" className="form-control-lg centered"
                            aria-describedby="emailDescr"
                            ref={this.email} required/>
                    </label>
                    <div id="emailDescr" className="form-text">
                        Enter a valid email address.
                    </div>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:<br/>
                        <input id="password" type="password" className="form-control-lg centered"
                            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                            aria-describedby="passwordDescr"
                            ref={this.password} required />
                    </label>
                    <div id="passwordDescr" className="form-text">
                        Passwords must be at least 8 characters long with at least one number, 
                        one lower case letter, and one upper case letter.
                    </div>
                    </div>
                <p></p>
                <button type="submit" id="loginBtn" 
                        className="btn btn-primary fm-primary-btn">
                    <span id="loginBtnIcon" 
                        className="fas fa-sign-in-alt" 
                        aria-hidden="true"></span>
                        &nbsp;Log In
                </button>
                </form>
                <ul className="nav justify-content-center">
                <li className="nav-item">
                    <button id="createAccountBtn" className="nav-link btn btn-link">
                        Create Account
                    </button>
                </li>
                <li className="nav-item">
                    <button id="resetPasswordBtn" className="nav-link btn btn-link">Reset Password</button>
                </li>
                </ul>
            </div>  
        )
    }
}

export default LoginPage;