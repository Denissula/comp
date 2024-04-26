import {Link, useNavigate} from "react-router-dom";

function Navbar(){
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear()
        navigate("/")
    }

    return(
        <div className="navBar">
            <Link to={"/home"} className="navCenter">Home</Link>
            <button onClick={logout}>Dil</button>
        </div>
    );
}

export default Navbar;