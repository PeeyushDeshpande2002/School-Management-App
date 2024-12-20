import { useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

const TeacherRoute = ({children}) => {
    const {user} = useSelector(store => store.auth);
    const navigate = useNavigate();
    useEffect(()=>{
        if(user == null || user.role !== 'Teacher'){
            navigate(`/${user.role}`);
        }
    },[]);
    return(
        <>
        {children}
        </>
    )
};
export default TeacherRoute