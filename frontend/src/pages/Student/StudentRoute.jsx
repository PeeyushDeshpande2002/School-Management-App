import { useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

const StudentRoute = ({childern}) => {
    const {user} = useSelector(store => store.auth);
    const navigate = useNavigate();
    useEffect(()=>{
        if(user == null || user.role !== 'Student'){
            navigate(`/${user.role}`);
        }
    },[]);
    return(
        <>
        {childern}
        </>
    )
};
export default StudentRoute