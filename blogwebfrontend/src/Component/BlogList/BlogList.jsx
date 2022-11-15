import React  from 'react';
import BlogsCard from "../BlogsCard/BlogsCard";
import withRouter from "../../withRouterFn";

class BlogList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            blogs: null
        }        
    }  
    render() {
        return (
            <div className="bloglist-back">
                {(!this.props.blogsData || this.props.blogsData.length === 0) && <div>Loading data..</div>}
                {this.props.blogsData && this.props.blogsData.map((blog) => (
                    <BlogsCard 
                        blogTitle={blog.title} 
                        blogSubject={blog.subject}
                        icon={"arrow_forward"}
                        blogId={blog._id}
                        key={blog._id} 
                        authState={true}
                        path={this.props.path}
                        handleClick={(e,docId) => this.props.handleReq(e.innerHTML,docId)}>
                        {this.props.children}
                    </BlogsCard>
                ))}
            </div>
        );
    }
}



export default withRouter(BlogList);