import React from "react";
import {checkForAuth,login } from "../../functions";
import PopUpBox from "../POPUP/PopUpBox";
import Button from "../UI Component/Button/button";
import './userLogin.css'
class UserLogin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            popup: false,
            popupMessage: "",
            popupHeading: "",
            popupLink: "", 
            popupredirect: false
        };
        this.loginUser = this.loginUser.bind(this);
    }
    componentDidMount(){
        checkForAuth().then((res) => {
            console.log(res);
            if(res.status){
                if(res.isAdmin)
                    window.location.assign('/admin');
                else 
                    window.location.assign('/dashBoard');
            }
        });
    }
    loginUser() {
        login(this.state.email,this.state.password).then((data) => {
            console.log(data);
            if(data.status){
                this.setState({
                    popup: true,
                    popupHeading: "Login",
                    popupLink: data.isAdmin?"/admin":"/dashboard",
                    popupredirect: true,
                    popupMessage: data.message
                });
            }else {
                this.setState({
                    popup: true,
                    popupHeading: "Login",
                    popupLink: "OK",
                    popupredirect: false,
                    popupMessage: data.message
                }); 
            }
        });
    }
    render() {
        return (
            <span className="login-back">
                {this.state.popup && <PopUpBox 
                    heading={this.state.popupHeading}
                    message={this.state.popupMessage} 
                    link={this.state.popupLink}
                    redirect={this.state.popupredirect} 
                    handleButtonClick={() => {
                        this.setState({
                            popup: false
                        });
                    }}
                />}
                {!this.state.popup && 
                <>
                <span className="heading-medium">
                    User Login
                </span>
                <input type="text" placeholder="Email" value={this.state.email}  onChange={(e) => {
                    this.setState({email: e.target.value})
                }} />
                <input type="password" placeholder="Password" value={this.state.password} onChange={(e) => {
                    this.setState({password: e.target.value})
                }} />
                <span className="row">
                    <Button text="Sign In" handleButtonClick={this.loginUser}  />
                    <Button text="Sign Up" handleButtonClick={() => console.log('coming soon')}  />
                </span>
                </>
                }
            </span>

        );
    }
}


export default UserLogin;