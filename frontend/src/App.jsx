import { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";
import './App.css';

function App() {
    const [students, setStudents] = useState([]);

    const fetchStudents = async () => {
        try {
            const res = await axios.get("http://localhost:4000/students");
            setStudents(res.data);
        } catch (err) {
            alert("Impossible de récupérer les étudiants");
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div className="container">
            <h1>Enregistrement des étudiants</h1>
            <StudentForm onStudentAdded={fetchStudents} />
            <hr />
            <StudentTable students={students} onDelete={fetchStudents} />
        </div>
    );
}

export default App;
