import { useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({childern}) => {
    const {user} = useSelector(store => store.auth);
    const navigate = useNavigate();
    useEffect(()=>{
        if(user == null || user.role != 'Admin'){
            navigate(`/${user.role}`);
        }
    },[]);
    return(
        <>
        {childern}
        </>
    )
};
export default ProtectedRoute