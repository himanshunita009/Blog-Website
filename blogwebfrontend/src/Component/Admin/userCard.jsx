import React from "react";
import { Link } from "react-router-dom";
import "./userCard.css";
class UserCard extends React.Component {
    render(){
        return (
            <div className="user-card-back">
                <span>{this.props.user.name}</span><br />
                <span>{this.props.user.email}</span><br />
                <span><Link to={`/admin/${this.props.user.email}/approvedBlogs`} onClick={() => {this.props.loadData(1,this.props.user.email)}}>Approved Blogs</Link> : {this.props.user.contribution.approved}</span><br />
                <span><Link to={`/admin/${this.props.user.email}/pendingBlogs`} onClick={() => {this.props.loadData(2,this.props.user.email)}}>Pending Blogs</Link>&nbsp;&nbsp;&nbsp;&nbsp;: {this.props.user.contribution.pending}</span><br />
                <span><Link to={`/admin/${this.props.user.email}/rejectedBlogs`} onClick={() => {this.props.loadData(3,this.props.user.email)}}>Rejected Blogs</Link> &nbsp;&nbsp;: {this.props.user.contribution.rejected}</span>
            </div>          
        );
    }
};


export default UserCard;
