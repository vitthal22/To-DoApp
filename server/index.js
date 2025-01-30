const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin')
// const auth = require('firebase-admin/auth')

const app = express();
const PORT = 5000;

//firestore access
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore(); //database setup

app.use(cors());
app.use(express.json());


//Display task and crud for the todo

app.get('/tasks', async (req, res) => {
    try {
        const tasksSnapshot = await db.collection('tasks').get();
        const tasks = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(tasks);
        console.log(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
});

app.post('/tasks', async (req, res) => {
    try {
        const { title, disp } = req.body;
        const newTask = { title, disp };
        const docRef = await db.collection('tasks').add(newTask);
        res.status(201).json({ message: 'Task added successfully!', id: docRef.id });
    } catch (error) {
        res.status(500).json({ message: 'Error adding task', error });
    }
});

app.put('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, disp } = req.body;

        const taskRef = db.collection('tasks').doc(id);
        const task = await taskRef.get();

        if (task.exists) {
            await taskRef.update({ title, disp });
            res.json({ message: 'Task updated successfully!' });
        } else {
            res.status(404).json({ message: 'Task not found!' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
});

app.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const taskRef = db.collection('tasks').doc(id);
        const task = await taskRef.get();

        if (task.exists) {
            await taskRef.delete();
            res.json({ message: 'Task deleted successfully!' });
        } else {
            res.status(404).json({ message: 'Task not found!' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



