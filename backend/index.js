const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 4000;

// middlewares
app.use(cors());
app.use(express.json());

// path el json
const DATA_FILE = path.join(__dirname, "students.json");

// ta9ra fi json file
const readStudents = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, "utf8");
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

// writing in json
const writeStudents = (students) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(students, null, 2));
};

// validation te3 el mail
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// GET /students
app.get("/students", (req, res) => {
    const students = readStudents();
    res.status(200).json(students);
});

// POST /students
app.post("/students", (req, res) => {
    const { name, email, course, experience } = req.body;
    const students = readStudents();

    if (!name || !email || !course) {
        return res.status(400).json({ message: "Nom, email et cours sont obligatoires" });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ message: "Format d'email invalide" });
    }

    if (students.some((s) => s.email === email)) {
        return res.status(409).json({ message: "Cet email est déjà enregistré" });
    }

    const newStudent = {
        name,
        email,
        course,
        experience: course === "Math Avancé" ? experience || "" : "",
    };

    students.push(newStudent);
    writeStudents(students);

    res.status(201).json({ message: "Étudiant ajouté avec succès", student: newStudent });
});

// DELETE /students/:email
app.delete("/students/:email", (req, res) => {
    const { email } = req.params;
    let students = readStudents();

    const index = students.findIndex((s) => s.email === email);
    if (index === -1) return res.status(404).json({ message: "Étudiant non trouvé" });

    const removed = students.splice(index, 1);
    writeStudents(students);

    res.status(200).json({ message: "Étudiant supprimé avec succès", student: removed[0] });
});

// server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
