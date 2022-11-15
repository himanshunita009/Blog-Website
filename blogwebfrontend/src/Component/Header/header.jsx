import Button from '../UI Component/Button/button';
import './Header.css';
import { connect } from "react-redux";
import { checkForAuth } from '../../functions';
const Header = (props) => {
    const handleClick = () => {
        fetch('/logout').then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    if(!props.authState)
        checkForAuth();
    return (
        <div className="head-main">
            {props.authState && <span className="material-icons" 
                onClick={()=> props.setMenuState(!props.menuState)}
            >menu</span>}
            <span className="company-name">Bloggers.com</span>
            <span className="user-auth-button">
                <Button text={"Log Out"} icon={""} handleButtonClick={handleClick}/>    
            </span>
        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        authState: state.authState,
        menuState: state.menuState
    }
}
const mapDispatchToPorps = (dispatch) => {
    return {
        setMenuState: (menuState) => {dispatch({type: 'SET_MENU_STATE',menuState: menuState})}
    }
}
export default connect(mapStateToProps,mapDispatchToPorps)(Header);