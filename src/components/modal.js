import React, {useContext} from 'react';
import StudentContext from "../context/context";

const Modal = ({name, nid, onClose}) => {
    const {deleteStudent} = useContext(StudentContext);

    const handleDelete = () => {
        deleteStudent(nid);
        onClose();
    };

    return (
        <div className="modal">
            <div>
                <h2>Jeni I sigurt qe doni te fshini studentin {name}?! </h2>
                <button onClick={handleDelete}>Po</button>
                <button onClick={onClose}>Jo</button>
            </div>
        </div>);
};


export default Modal;