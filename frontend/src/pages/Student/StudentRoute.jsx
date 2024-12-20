import { useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

const StudentRoute = ({children}) => {
    const {user} = useSelector(store => store.auth);
    const navigate = useNavigate();
    //console.log("i m here");
    useEffect(()=>{
        if(user == null || user.role !== "Student"){
            navigate(`/${user.role}`);
        }
    },[]);
    return(
        <>
        
        {children}

        </>
    )
};
export default StudentRoute