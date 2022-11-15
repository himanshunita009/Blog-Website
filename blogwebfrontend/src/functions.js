import { store } from "./index";
const checkForAuth = async () => {
    return await fetch('/checkAuth').then((res) => {
        return res.json();
    }).then((data)=> {
        store.dispatch({type: 'SET_AUTH_STATE',status: data.status,user: data.user,isAdmin: data.isAdmin})
        return data;
    }).catch((err) => {
        console.log(err);
    });
}

const login = async (email,password) => {
    return await fetch('/login',{
        method: "POST",
        body: JSON.stringify({
            email,password
        }),
        headers: {
            "Content-Type" : "application/json"
        }
    }).then((res) => {
        return res.json();
    }).then((data) => {
        
        return data;
    }).catch((err) => {
        console.log(err);
    });
}


const blogManipulateReq = async(reqType,docId,listNo,data) => {
    fetch(`/moveBlog?reqType=${reqType}&listNo=${listNo}&docId=${docId}`).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
    });
}


export  {checkForAuth, login,blogManipulateReq };