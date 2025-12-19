import { useState } from "react";
import axios from "axios";

function StudentTable({ students, onDelete }) {
    const [sortField, setSortField] = useState(""); // nom ou email

    const handleDelete = async (email) => {
        try {
            const res = await axios.delete(`http://localhost:4000/students/${email}`);
            alert(res.data.message);
            onDelete();
        } catch (err) {
            alert(err.response?.data?.message || "Erreur serveur");
        }
    };

    // tri dynamique
    const sortedStudents = [...students].sort((a, b) => {
        if (!sortField) return 0;
        return a[sortField].localeCompare(b[sortField]);
    });

    return (
        <div>
            {/* Select pour trier */}
            <div style={{ marginBottom: "15px" }}>
                <label style={{ marginRight: "10px", fontWeight: "bold",color:"black" }}>Trier par :</label>
                <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
                    <option value="name">Nom</option>
                    <option value="email">Email</option>
                </select>
            </div>

            {/* Tableau */}
            <table>
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Cours</th>
                    <th>Expérience</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {sortedStudents.map((s) => (
                    <tr key={s.email}>
                        <td>{s.name}</td>
                        <td>{s.email}</td>
                        <td>{s.course}</td>
                        <td>{s.experience || "-"}</td>
                        <td>
                            <button onClick={() => handleDelete(s.email)}>Supprimer</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentTable;
