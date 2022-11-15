import React from 'react';
import { checkForAuth } from '../../functions';
import PopUpBox from '../POPUP/PopUpBox';
import './addBlogs.css';
//import './form.css';
class AddBlogs extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            contents: [{heading: "",para: ""}],
            title: "",
            subject: "" 
        }
        this.addInput = this.addInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        // checkForAuth().then((res) => {
        //     if(!res.status){
        //         window.alert('you are not authorised');
        //         window.location.assign('/login');
        //     }
        // });
    }
    addInput(){
        let data = this.state.contents;
        data.push({heading: "",para: ""});
        this.setState({
            contents: data
        });
    }
    handleSubmit() {
        let blogData = {
            title: this.state.title,
            subject: this.state.subject,
            contents: this.state.contents
        }
        fetch('/addBlogsData',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(blogData)
        }).then((res) =>{
            return res.json();
        }).then((status) => {
            console.log(status);
        }).catch((err) => {
            console.log(err);
        });
    }
    render(){
        return (
          <div className="addBlog-back">
            <input type="text" placeholder='Title'
                value={this.state.title}
                onChange={(e) => {
                    this.setState({
                        title: e.target.value
                    });
                }}
            />
            <input type="text" placeholder='Subject'
                value={this.state.subject}
                onChange={(e) => {
                    this.setState({
                        subject: e.target.value
                    });
                }}
            />
            {this.state.contents && this.state.contents.map((content,index) => (
                <div className="para" key={index}>
                    <input type="text" 
                        placeholder={`Heading ${index+1}`} 
                        value={content.heading} 
                        onChange={(e) => {
                            let data = this.state.contents;
                            data[index].heading = e.target.value
                            this.setState({
                               contents: data 
                            });
                        }}
                    /> 
                    <textarea cols="30" rows="10"
                        placeholder={`About Heading ${index+1}`} 
                        value={content.para} 
                        onChange={(e) => {
                            let data = this.state.contents;
                            data[index].para = e.target.value
                            this.setState({
                               contents: data 
                            });
                        }}
                    />
                        
                    <button 
                        onClick={() => {
                            let data = this.state.contents.filter(({},ind) => ind !== index);
                            this.setState({
                                contents: data
                            });
                        }} 
                    >-</button>
                </div>
            ))}

            <button onClick={() => this.addInput()}>+</button>
            <button onClick={this.handleSubmit}>Submit</button>
          </div>  
        );
    }
}
// const Form = () => {
//     const [title,setTitle] = useState(''); 
//     const [subject,setSubject] = useState(''); 
//     const [paras,setPara] = useState([{
//         heading: '',
//         content: ''
//     }]);
//     const handleInc = () => {
//         setPara([...paras,{
//             heading: '',
//             content: ''
//         }]);
//     }
//     const handleSubmit = () => {
//         setPopUpStatus(true);
//         const obj = {
//             title,subject,paras  
//         };
//         fetch('http://localhost:5000/addBlogData',{
//             method: 'POST'
//             ,body: JSON.stringify({
//                 title: obj.title,
//                 subject: obj.subject,
//                 paras: obj.paras
//             }),
//             headers: {
//                 "Content-Type": "application/json; charset=UTF-8"
//             }
//         }).then(res => {
//             console.log(res);
//         })
//     }
//     const changeHeading = (val,index) => {
//         paras[index].heading = val;
//         setPara([...paras]);
//     }
//     const changeContent = (val,index) => {
//         paras[index].content = val;
//         setPara([...paras]);
//     }
//     const handleDelete = (target) => {
//         // eslint-disable-next-line
//         const obj = paras.filter(({},index)=>{
//             return target !== index
//         });
//         setPara([...obj]);
//     }
//     const [popUpShow,setPopUpStatus] = useState(false);
//     return ( 
//         <div className="form-main">
//             {/*popUpShow && <PopUpBox heading={"This is heading"} message="This is some message about PopUpBox" />*/}
//             <div className="input-field">
//                 <label htmlFor="title">Title</label>
//                 <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
//             </div>
//             <div className="input-field">
//                 <label htmlFor="subject">Subject</label>
//                 <input type="text" name="subject" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)}/>
//             </div>
//             <div className="para-main">
//                 {paras.map((para,index) => (
//                     <div className="para" key={index}>
//                         <div className="input-field">
//                             <label>{index+1}. Heading</label>
//                             <input type="text" value={para.heading} onChange={(e) => {changeHeading(e.target.value,index)}}/>
//                         </div>
//                         <div className="input-field">
//                             <label>{index+1}. Content</label>
//                             <textarea cols="30" rows="10" value={para.content} onChange={(e) => {changeContent(e.target.value,index)}}></textarea>
//                         </div>
//                         <input type="button" value="-" onClick={()=>{handleDelete(index)}} />
//                     </div>
//                 ))}
//             </div>
//             <input type="button" value="+" onClick={handleInc} />
//             <button type="submit" onClick={handleSubmit}>Submit</button>
//         </div>
//     );
// }
 
export default AddBlogs;