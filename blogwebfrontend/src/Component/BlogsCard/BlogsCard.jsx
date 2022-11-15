import { Link } from 'react-router-dom';
import './BlogsCard.css';
const BlogsCard = ({blogId,blogTitle,blogSubject,authState,path,children,handleClick}) => {
    return ( 
        <span className="blogscard-main">
                <div className="zone-one">
                <Link to={`${path}/${blogId}`}><span className="blog-title">{blogTitle}</span></Link>
                    <span className="blog-content">{blogSubject}</span>
                </div>
            {authState && 
                <div className="zone-two" onClick={(e) => handleClick(e.target,blogId)}>
                    {children}
                </div>
            }
        </span>
     );
}
 
export default BlogsCard;