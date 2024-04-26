import {useContext, useEffect, useState} from "react";
import {useAuth} from "../custom-hooks/useAuth";
import {Link, useNavigate} from "react-router-dom";
import StudentContext from "../context/context";
import {validatePassword} from "../utilities/validatePassword";
import ErrorMessage from "../components/error-message";

function SignUp() {
    let auth = useAuth();
    const {data, addStudent} = useContext(StudentContext);
    const navigate = useNavigate();
    const [studentiNID, setStudentiNID] = useState('');
    const [emer, setEmer] = useState('');
    const [mbiemer, setMbiemer] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (auth) {
            navigate("/home");
        }
    }, [auth, navigate]);

    const signUpStudent = (e) => {
        e.preventDefault();
        const validate = validatePassword(password);
        if (data.some(item => item.NID === studentiNID) === false) {
            if (validate === true) {
                alert("Ju u rregjistruat me sukses!");
                localStorage.setItem("token", studentiNID);
                addStudent({
                    "id": Math.floor(Math.random() * 1000000),
                    "NID": studentiNID,
                    "name": emer,
                    "surname": mbiemer,
                    "grade": "",
                    "profession": "",
                    "education": "",
                    "courses": [
                        {
                            "name": "Arte te vecanta",
                            "subscribed": false,
                            "otherInfo": "",
                            "subscribeDate": ""
                        },
                        {
                            "name": "Arte jo te vecanta",
                            "subscribed": false,
                            "otherInfo": "",
                            "subscribeDate": ""
                        },
                        {
                            "name": "Arte te thjeshta",
                            "subscribed": false,
                            "otherInfo": "",
                            "subscribeDate": ""
                        }],
                    "password": password
                })
                navigate("/home");
            } else {
                setErrorMessage(validate.status);
            }
        } else {
            setErrorMessage("Ju ekzistoni i rregjistruar ne rregjistrin e studenteve!");
        }
    }

    return (
        <div className="signUpForm">
            <h2>Sign Up</h2>
            <form onSubmit={signUpStudent}>
                <input type="text" placeholder="NID Studenti" required={true}
                       onChange={e => setStudentiNID(e.currentTarget.value)} value={studentiNID}/>
                <input type="text" placeholder="Emer" onChange={e => setEmer(e.currentTarget.value)} value={emer}/>
                <input type="text" placeholder="Mbiemer" onChange={e => setMbiemer(e.currentTarget.value)}
                       value={mbiemer}/>
                <input type="password" placeholder="Password" required={true}
                       onChange={e => setPassword(e.currentTarget.value)} value={password}/>
                <button type="submit">Rregjistrohu</button>
                <Link to={"/"}>Anullo</Link>
            </form>
            <ErrorMessage message={errorMessage}/>
        </div>
    );
}

export default SignUp;