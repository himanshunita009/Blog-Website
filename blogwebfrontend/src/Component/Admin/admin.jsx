import React  from "react";
import { blogManipulateReq, checkForAuth } from "../../functions";
import { connect } from "react-redux";
import UserCard from "./userCard";
import './admin.css';
import { getBlogsList } from "../BlogList/getBlogsListFetch";
import BlogList from "../BlogList/BlogList";
import withRouter from "../../withRouterFn";


class Admin extends  React.Component {
    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
        this.state = {
            blogs: null
        }
        this.handleReq = this.handleReq.bind(this);
    }
    handleReq(e,docId) {
        let listNo;
        if(this.props.activeElement >= 3 && this.props.activeElement <= 5){
            listNo = this.props.activeElement-2;
        }
        if(this.props.activeElement >= 6 && this.props.activeElement <= 8){
            listNo = this.props.activeElement-5;
        }
        let reqType ;
        switch(e){
            case 'recommend':
                reqType = 1;
                break;
            case 'cancel':
                reqType = 2;
                break;
            case 'delete':
                reqType = 3;
                break;
        }
        blogManipulateReq(reqType,docId,listNo);
    }
    componentDidMount(){
        
        if(!this.props.adminData)
        checkForAuth().then((res) => {
            if(!res.status){
                alert('you are not authorised');
                window.location.assign('/login');
            }
            if(res.status && !res.isAdmin){
                alert('restricted area');
                window.location.assign('/dashboard');
            }else { 
                this.props.setAdminData(res.user);
                fetch('/getUsers').then((res) => {
                    return res.json();
                }).then((data) => {
                    this.props.setUsersData(data.users);

                }) 
                .catch((err) => {
                    console.log(err);
                });
            } 
            
        });
        this.loadData(this.props.activeElement,this.props.router.params.email);
    }   
    async loadData(listNo,email){
        if(this.props.activeElement >= 3 && this.props.activeElement <= 5)
            listNo -= 2;
        if(this.props.activeElement >= 6 && this.props.activeElement <= 8)
            listNo -= 5;
        this.setState({
            blogs: null
        });
        const res = await getBlogsList(listNo,email===undefined?'null':email,0);
        this.setState({
            blogs: res.body
        });
        
    }
    componentDidUpdate(prevProps){
        if(prevProps.activeElement !== this.props.activeElement && this.props.activeElement >= 2){
            
            this.loadData(this.props.activeElement,this.props.router.params.email);
        }
    }
    render() {
        
        return (
          <div className="admin-back">
            {this.props.activeElement === 1 && !this.props.adminData && <div>Loading...</div>}
            {this.props.activeElement === 1 && this.props.adminData && <div>Hello Admin</div>}
            {this.props.activeElement === 2 && this.props.users && this.props.users.map((user,index) => (
                <UserCard user={user} key={index} loadData={this.loadData} />
            ))}
            {this.props.activeElement === 3  && 
                <BlogList handleReq={this.handleReq} blogsData={this.state.blogs} path={`/admin/${this.props.router.params.email}/approvedBlogs`} >
                    <span className="material-icons" title='Reject Blog'>cancel</span>
                </BlogList>
            }
            {this.props.activeElement === 4  && 
                <BlogList handleReq={this.handleReq} blogsData={this.state.blogs} path={`/admin/${this.props.router.params.email}/pendingBlogs`} >
                    <span className="material-icons" title='Approve Blog'>recommend</span>
                    <span className="material-icons" title='Reject Blog'>cancel</span>
                </BlogList>
            }
            {this.props.activeElement === 5  && 
                <BlogList handleReq={this.handleReq} blogsData={this.state.blogs} path={`/admin/${this.props.router.params.email}/rejectedBlogs`}>
                    <span className="material-icons" title='Approve Blog'>recommend</span>
                    <span className="material-icons" title='Delete Blog'>delete</span>
                </BlogList>
            }
            {this.props.activeElement === 6  && 
                <BlogList handleReq={this.handleReq} blogsData={this.state.blogs} path={`/admin/approvedBlogs`} >
                    <span className="material-icons" title='Reject Blog'>cancel</span>
                </BlogList>
            }
            {this.props.activeElement === 7  && 
                <BlogList handleReq={this.handleReq} blogsData={this.state.blogs} path={`/admin/pendingBlogs`} >
                    <span className="material-icons" title='Approve Blog'>recommend</span>
                    <span className="material-icons" title='Reject Blog'>cancel</span>
                </BlogList>
            }
            {this.props.activeElement === 8  && 
                <BlogList handleReq={this.handleReq} blogsData={this.state.blogs} path={`/admin/rejectedBlogs`}>
                    <span className="material-icons" title='Approve Blog'>recommend</span>
                    <span className="material-icons" title='Delete Blog'>delete</span>
                </BlogList>
            }
          </div>
        );
    }
}

const mapStateToPops = (state) => {
    return {
        adminData: state.admin,
        users : state.users
    }
}

 

const mapDispatchToProps = (dispatch) => {
    return {
        setAdminData: (adminData) => {dispatch({type: 'SET_ADMIN',adminData: adminData})},
        setUsersData: (usersData) => {dispatch({type: 'SET_USERS',usersData: usersData})}
    }
}

export default connect(mapStateToPops,mapDispatchToProps)(withRouter(Admin));