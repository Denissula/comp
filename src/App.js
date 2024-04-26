import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import Home from "./pages/home";
import PrivateRoute from "./containers/privateRoute";
import {StudentContextProvider} from "./context/context";
import Student from "./pages/student";

function App() {
    return (
        <StudentContextProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<SignIn/>}></Route>
                    <Route path="/signup" element={<SignUp/>}></Route>
                    <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>}/>
                    <Route path="/student" element={<PrivateRoute><Student/></PrivateRoute>}/>
                </Routes>
            </Router>
        </StudentContextProvider>
    );
}

export default App;
