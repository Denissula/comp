import {Link, useNavigate} from "react-router-dom";

function Navbar(){
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear()
        navigate("/")
    }

    return(
        <>
            <Link to={"/home"}>Home</Link>
            <button onClick={logout}>Dil</button>
        </>
    );
}

export default Navbar;