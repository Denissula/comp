import React, {useContext, useState} from 'react';
import {useQuery} from '../custom-hooks/useQuery';
import StudentContext from '../context/context';
import {validatePassword} from '../utilities/validatePassword';
import {Link, useNavigate} from "react-router-dom";
import ErrorMessage from "../components/error-message";

const Student = () => {
    let query = useQuery();
    const navigate = useNavigate();
    const {data, editStudent} = useContext(StudentContext);
    let activeStudent = data.filter(student => student.NID === query.get('nid'))[0];
    const [courses, setCourses] = useState(activeStudent?.courses);
    const [errorMessage, setErrorMessage] = useState('');
    const [NID, setNID] = useState(activeStudent?.NID);
    const [name, setName] = useState(activeStudent?.name);
    const [surname, setSurname] = useState(activeStudent?.surname);
    const [grade, setGrade] = useState(activeStudent?.grade);
    const [profession, setProfession] = useState(activeStudent?.profession);
    const [education, setEducation] = useState(activeStudent?.education);
    const [password, setPassword] = useState(activeStudent?.password);

    if (activeStudent === undefined) {
        return <ErrorMessage message={"Ky student nuk ekziston"}/>;
    }

    const handleCheckboxChange = courseName => {
        setCourses(prevCourses => {
            return prevCourses.map(course => {
                if (course.name === courseName) {
                    const subscribed = !course.subscribed;
                    const subscribeDate = subscribed ? new Date().toISOString().split('T')[0] : '';
                    return {...course, subscribed, subscribeDate};
                } else {
                    return course;
                }
            });
        });
    };

    const handleOtherInfoChange = (courseName, newOtherInfo) => {
        setCourses(prevCourses => {
            return prevCourses.map(course => {
                if (course.name === courseName) {
                    return {...course, otherInfo: newOtherInfo};
                } else {
                    return course;
                }
            });
        });
    };

    const editStudentData = e => {
        e.preventDefault();
        const validate = validatePassword(password);
        if (validate === true) {
            editStudent({
                "NID": NID,
                "name": name,
                "surname": surname,
                "grade": grade,
                "profession": profession,
                "education": education,
                "courses": courses,
                "password": password
            }, NID);
            alert("Te dhenat u ruajten me sukses");
            navigate("/home");
        } else {
            setErrorMessage(validate.status);
        }
    };

    return (
        <div className="formContainer">
            <form onSubmit={editStudentData}>
                <div>
                    <label>NID Studenti :</label>
                    <input
                        readOnly={true}
                        value={NID}
                        onChange={e => setNID(e.target.value)}
                    />
                </div>
                <div>
                    <label>Emer :</label>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Mbiemer :</label>
                    <input
                        value={surname}
                        onChange={e => setSurname(e.target.value)}
                    />
                </div>
                <div>
                    <label>Nota mesatare :</label>
                    <input
                        value={grade}
                        type="number"
                        step="0.01"
                        max="10"
                        onChange={e => {
                            let value = parseFloat(e.target.value);
                            if (isNaN(value)) {
                                value = '';
                            } else if (value > 10) {
                                value = 10;
                            } else {
                                value = value.toFixed(2);
                            }
                            setGrade(value);
                        }}
                    />
                </div>
                <div>
                    <label>Profesioni deshiruar :</label>
                    <input
                        value={profession}
                        onChange={e => setProfession(e.target.value)}
                    />
                </div>
                <div>
                    <label>Te dhena te pergjithshme te shkollimit :</label>
                    <input
                        value={education}
                        onChange={e => setEducation(e.target.value)}
                    />
                </div>
                <label>Lendet :</label>
                <table>
                    <tbody>
                    {courses.map((course, index) => (
                        <tr key={index}>
                            <th>{course.name}</th>
                            <th>
                                <label>Perzgjidhe</label>
                                <input
                                    type="checkbox"
                                    checked={course.subscribed}
                                    onChange={() => handleCheckboxChange(course.name)}
                                />
                            </th>
                            <th>
                                <label>Data e perzgjedhjes</label>
                                <input type="date" value={course.subscribeDate} readOnly/>
                            </th>
                            <th>
                                <label>Info te tjera</label>
                                <input
                                    type="text"
                                    value={course.otherInfo}
                                    onChange={e => handleOtherInfoChange(course.name, e.target.value)}
                                />
                            </th>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div>
                    <label>Fjalekalimi :</label>
                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Ndrysho Vlera e studentit {name} </button>
                <Link to={"/home"}>Anullo</Link>
                <ErrorMessage message={errorMessage}/>
            </form>
        </div>
    );
};

export default Student;
