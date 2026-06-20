const cors =require('cors');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let assignments = [
    { id: 1, title: "Lab 1", subject: "Java", dueDate: "2026-06-25", status: "Pending" },
    { id: 2, title: "Mini Project", subject: "Web Tech", dueDate: "2026-06-18", status: "Submitted" }
];
app.get('/api/assignments', (req, res) => {
    res.json(assignments);
});
app.listen(5000, () => {
    console.log("Server running on port 5000");
});