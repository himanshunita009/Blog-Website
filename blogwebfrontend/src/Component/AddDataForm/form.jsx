import { useState } from 'react';
import PopUpBox from '../POPUP/PopUpBox';
import './form.css';
const Form = () => {
    const [title,setTitle] = useState(''); 
    const [subject,setSubject] = useState(''); 
    const [paras,setPara] = useState([{
        heading: '',
        content: ''
    }]);
    const handleInc = () => {
        setPara([...paras,{
            heading: '',
            content: ''
        }]);
    }
    const handleSubmit = () => {
        setPopUpStatus(true);
        const obj = {
            title,subject,paras  
        };
        fetch('http://localhost:5000/addBlogData',{
            method: 'POST'
            ,body: JSON.stringify({
                title: obj.title,
                subject: obj.subject,
                paras: obj.paras
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then(res => {
            console.log(res);
        })
    }
    const changeHeading = (val,index) => {
        paras[index].heading = val;
        setPara([...paras]);
    }
    const changeContent = (val,index) => {
        paras[index].content = val;
        setPara([...paras]);
    }
    const handleDelete = (target) => {
        // eslint-disable-next-line
        const obj = paras.filter(({},index)=>{
            return target !== index
        });
        setPara([...obj]);
    }
    const [popUpShow,setPopUpStatus] = useState(false);
    return ( 
        <div className="form-main">
            {/*popUpShow && <PopUpBox heading={"This is heading"} message="This is some message about PopUpBox" />*/}
            <div className="input-field">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="input-field">
                <label htmlFor="subject">Subject</label>
                <input type="text" name="subject" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)}/>
            </div>
            <div className="para-main">
                {paras.map((para,index) => (
                    <div className="para" key={index}>
                        <div className="input-field">
                            <label>{index+1}. Heading</label>
                            <input type="text" value={para.heading} onChange={(e) => {changeHeading(e.target.value,index)}}/>
                        </div>
                        <div className="input-field">
                            <label>{index+1}. Content</label>
                            <textarea cols="30" rows="10" value={para.content} onChange={(e) => {changeContent(e.target.value,index)}}></textarea>
                        </div>
                        <input type="button" value="-" onClick={()=>{handleDelete(index)}} />
                    </div>
                ))}
            </div>
            <input type="button" value="+" onClick={handleInc} />
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
    );
}
 
export default Form;