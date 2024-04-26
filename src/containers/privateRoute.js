import {useAuth} from "../custom-hooks/useAuth";
import {Navigate, useLocation} from "react-router-dom";
import Navbar from "../components/navbar";

const PrivateRoute = ({children}) => {
    let auth = useAuth();
    let location = useLocation();

    if (auth === null) {
        return;
    } else if (auth) {
        return (
            <>
                <Navbar/>
                {children}
            </>);
    }

    return <Navigate to="/" state={{from: location}}/>;
};

export default PrivateRoute;