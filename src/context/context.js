import React, {createContext, useState} from 'react';
import {students} from '../data';

const StudentContext = createContext();

const initialData = students;

const addStudent = (setData, newData) => {
    setData(prevData => [...prevData, newData]);
};

const editStudent = (setData, newData, nid) => {
    setData(prevData => prevData.map(item => item.NID === nid ? {...item, ...newData} : item));
}


const deleteStudent = (setData, nid) => {
    setData(prevData => prevData.filter(item => item.NID !== nid));
}

export const StudentContextProvider = ({children}) => {
    const [data, setData] = useState(initialData);

    return (
        <StudentContext.Provider value={{
            data,
            addStudent: (newData) => addStudent(setData, newData),
            editStudent: (newData, nid) => editStudent(setData, newData, nid),
            deleteStudent: (nid) => deleteStudent(setData, nid)
        }}>
            {children}
        </StudentContext.Provider>
    );
};

export default StudentContext;