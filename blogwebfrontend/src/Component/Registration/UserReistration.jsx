import React from "react";
import { checkForAuth } from "../../functions";
import PopUpBox from "../POPUP/PopUpBox";
import Button from "../UI Component/Button/button";
import './userRegistration.css';
class UserRegistration extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            occupation: "",
            age: "",
            email: "",
            password: "",
            cpassword: "",
            popup: false,
            popupMessage: "",
            popupHeading: "",
            popupLink: "",
            popupredirect: false
        };
        this.registerUser = this.registerUser.bind(this);
    }
    componentDidMount() {
        checkForAuth().then((res)=> {
            if(res.status){
                window.location.assign('/dashBoard');
            }
        });
    }
    registerUser(){
        fetch('/register',{
            method: "POST",
            body: JSON.stringify({
                name: this.state.name,
                occupation: this.state.occupation,
                age: this.state.age,
                email: this.state.email,
                password: this.state.password,
                cpassword: this.state.cpassword
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            return res.json();
        }).then((data) => {
            if(data.status){
                this.setState({
                    popupHeading: "Login ",
                    popupMessage: data.message,
                    popupLink: '/login',
                    popupredirect: true,
                    popup: true
                });
            }else {
                this.setState({
                    popupHeading: "Login ",
                    popupMessage: data.message,
                    popupLink: 'OK',
                    popupredirect: false,
                    popup: true
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    render(){
    return ( 
        <div className="registration-back">
            {this.state.popup && 
                <PopUpBox 
                    heading={this.state.popupHeading}
                    message={this.state.popupMessage} 
                    link={this.state.popupLink}
                    redirect={this.state.popupredirect} 
                    handleButtonClick={() => {
                        this.setState({
                            popup: false
                        });
                    }}
                />
            }
            {!this.state.popup && 
            <>
                <input type="text" placeholder="Name" value={this.state.name} onChange={(e) => {
                    this.setState({name: e.target.value});
                }}/>
    
                <input type="text" placeholder="Occupation" value={this.state.occupation} onChange={(e) => {
                    this.setState({occupation: e.target.value});
                }}/>
    
                <input type="number" placeholder="Age" value={this.state.age} onChange={(e) => {
                    this.setState({age: e.target.value});
                }}/>
    
                <input type="email" placeholder="Email" value={this.state.email} onChange={(e) => {
                    this.setState({email: e.target.value});
                }}/>
    
                <input type="password" placeholder="Password" value={this.state.password} onChange={(e) => {
                    this.setState({password: e.target.value});
                }}/>
    
                <input type="password" placeholder="Confirm Password" value={this.state.cpassword} onChange={(e) => {
                    this.setState({cpassword: e.target.value});
                }}/>
    
                <Button text={"Sign Up"} handleButtonClick={this.registerUser} />
            </>
            }
            
        </div>
     );
    }
}
 
export default UserRegistration;