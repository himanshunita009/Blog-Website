import { store,adminStore } from "../../index";


export const getBlogsList = async (listNo,user,pageNo) => {
    return await fetch(`/getBlogList?listNo=${listNo}&pageNo=${pageNo}&user=${user}`).then((res) => {
        return res.json();
    }).then((result) => {
        if(!adminStore.getState().admin)
        switch(listNo){
            case 1:
                if(user !== 'null')
                    store.dispatch({type: 'SET_APPROVED_BLOGS',blogs: result.body});
                else 
                    store.dispatch({type: 'SET_BLOGS',blogs: result.body});
                break;
            case 2:
                store.dispatch({type: 'SET_PENDING_BLOGS',blogs: result.body});
                break;
            case 3:
                store.dispatch({type: 'SET_REJECTED_BLOGS',blogs: result.body});
                break;
            
        }   
        return result;
    }).catch((err) => {
        console.log(err);
        return false;
    });
}