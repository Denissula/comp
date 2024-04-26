import {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../custom-hooks/useAuth";
import StudentContext from "../context/context";

function SignIn(){
    const navigate = useNavigate();
    let auth = useAuth();
    const { data } = useContext(StudentContext);
    const [studentId, setStudentId] = useState('')
    const [password, setPassword] = useState('')
    const [validationResult, setValidationResult] = useState('');


    useEffect(() => {
        if(auth){
            navigate("/home");
        }
    }, [auth, navigate]);

    const loginUser = (e) => {
        e.preventDefault();
        const foundUser = data.find((student) => student.NID === studentId);
        if (!foundUser) {
            setValidationResult("Studenti Nuk Ekziston");
        } else {
            if (foundUser.password === password) {
                setValidationResult( "Sukses");
                localStorage.setItem("token", studentId);
                navigate("/home");
            } else {
                setValidationResult("Fjalekalimi Gabim");
            }
        }
    }

    return(
        <>
            <form onSubmit={loginUser}>
                <input type="text" onChange={(e) => setStudentId(e.target.value)}/>
                <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Sign In</button>
                <Link to={"/signup"}>Sign Up</Link>
            </form>
            <h4>{validationResult}</h4>
        </>
    );
}

export default SignIn;