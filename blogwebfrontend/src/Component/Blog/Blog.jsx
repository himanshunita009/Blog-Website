import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { blogManipulateReq } from "../../functions";
const Blog = ({index}) => {
    const [blog,setBlog] = useState(null);
    const params = useParams();
        useEffect(() => {
            let listNo;
            if(index === 0 || index === 2 || index === 5 || index === 8)
                listNo = 1;
            else if(index === 3 || index === 6 || index === 9)
                listNo = 2;
            else if(index === 4 || index === 7  || index === 10)
                listNo = 3;
            const url = `/blog/?listNo=${listNo}&id=${params.id}`;
            fetch(url).then(res => {
                return res.json();
            }).then(data => {
                setBlog(data);
            });
         },[params.id,index]);
    const handleClick = (reqType) => {
        let listNo;
            if(index === 0 || index === 2 || index === 5 || index === 8)
                listNo = 1;
            else if(index === 3 || index === 6 || index === 9)
                listNo = 2;
            else if(index === 4 || index === 7  || index === 10)
                listNo = 3;
        blogManipulateReq(reqType,params.id,listNo);
    }
    return (        
        <div className="blog-main">
            {blog && 
                <>
                <span className="blog-title">{blog.title}</span>
                <hr />
                <span className="blog-title">{blog.authorDetails.name}</span>
                <hr />
                <span className="blog-title">{blog.authorDetails.email}</span>
                {blog.contents.map((content,index) => (
                    <div key={index}>
                        <hr />
                        <span className="blog-heading">{content.heading}</span>
                        <hr />
                        <span className="blog-heading">{content.para}</span>
                    </div>
                ))}

                {(index === 2) && 
                    <>
                        <button>Update</button>
                        <button onClick={() => handleClick(3)}>Delete</button>
                    </>                
                }

                {(index === 5 || index === 8) && 
                    <>
                        <button onClick={() => handleClick(2)}>Reject</button>
                    </>                
                }
                {(index === 6 || index === 9) && 
                    <>
                        <button onClick={() => handleClick(1)}>Approve</button>
                        <button onClick={() => handleClick(2)}>Reject</button>
                    </>                
                }
                {(index === 4) && 
                    <>
                        <button>Update</button>
                        <button onClick={() => handleClick(3)} >Delete</button>
                    </>                
                }
                {(index === 7 || index === 10) && 
                    <>
                        <button onClick={() => handleClick(1)} >Approve</button>
                        <button onClick={() => handleClick(3)} >Delete</button>
                    </>                
                }
                </>
            }
            {!blog && <span className="blog-loading">Loading...</span>}
        </div>
     );
}
 
export default Blog;