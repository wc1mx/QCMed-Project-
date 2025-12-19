import { useState } from "react";
import axios from "axios";

function StudentForm({ onStudentAdded }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [course, setCourse] = useState("");
    const [experience, setExperience] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:4000/students", {
                name,
                email,
                course,
                experience,
            });
            alert(res.data.message);
            onStudentAdded(); // updating the table
            setName("");
            setEmail("");
            setCourse("");
            setExperience("");
        } catch (err) {
            alert(err.response?.data?.message || "Erreur serveur");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <select value={course} onChange={(e) => setCourse(e.target.value)} required>
                <option value="">Sélectionner un cours</option>
                <option value="Math">Math</option>
                <option value="Math Avancé">Math Avancé</option>
                <option value="Science">Science</option>
                <option value="Histoire">Histoire</option>
            </select>

            {course === "Math Avancé" && (
                <input
                    type="text"
                    placeholder="Expérience préalable"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                />
            )}

            <button type="submit">Ajouter</button>
        </form>
    );
}

export default StudentForm;
