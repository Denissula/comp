import React, {useContext, useState} from 'react';
import StudentContext from "../context/context";
import {Link} from "react-router-dom";
import Modal from "../components/modal";

const Home = () => {
    const {data} = useContext(StudentContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [studentForDelete, setStudentForDelete] = useState({
        nid: "",
        name: "",
    });

    const showModal = ( nid,name) => {
        setStudentForDelete({
            nid: nid,
            name: name,
        });
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }


    return (
        <>
            <table key={data.length}>
                <thead>
                <tr>
                    <th></th>
                    <th>
                        NID Studenti
                    </th>
                    <th>
                        Emer
                    </th>
                    <th>
                        Mbiemer
                    </th>
                    <th>
                        Numri Lendeve
                    </th>
                    <th>
                        Veprimet
                    </th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.NID}</td>
                        <td>{item.name}</td>
                        <td>{item.surname}</td>
                        <td>{item.courses.filter(course => course.subscribed).length}</td>
                        <td>
                            <Link to={"/student?nid=" + item.NID}>Editimi</Link>
                            <button onClick={() => showModal(item.NID, item.name)}>Fshi</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {isModalOpen && (
                <Modal onClose={closeModal} name={studentForDelete.name} nid={studentForDelete.nid}/>
            )}
        </>
    );
};

export default Home;