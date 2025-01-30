import  { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'
import NavBar from './NavBar'
import randomColor from 'randomcolor';
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
// import { Modal } from 'bootstrap';




function TaskForm() {

  const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDisp, setTaskDisp] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [userDetail, setUserDetail] = useState('');

    //user detail code to display its name in todo home

    const fetchUserData = async () =>{
      auth.onAuthStateChanged(async (user) =>{
        console.log(user);

      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetail(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
      })
    }

    //connection to backend 
    const fetchTasks = async () => {
      try {
          const response = await axios.get('http://localhost:5000/tasks');
          const tasksWithColors = response.data.map((task) => ({
              ...task,
              color: randomColor(), // Add random color for styling
          }));
          setTasks(tasksWithColors);
          
      } catch (error) {
          console.error("Error fetching tasks:", error);
      }
  };
  

    useEffect(() => {
        fetchTasks();
        fetchUserData();

        const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', () => {
        setEditingTaskId(null);
        setTaskTitle('');
        setTaskDisp('');
      });
    }

    return () => {
      if (modalElement) {
        modalElement.addEventListener('hidden.bs.modal', () => {
          setEditingTaskId(null);
          setTaskTitle('');
          setTaskDisp('');
      });
      }
    };
    }, []);


    const addTask = async () => {
      if (!taskTitle.trim() || !taskDisp.trim()) return;
  
      const newTask = { title: taskTitle, disp: taskDisp };
  
      try {
          await axios.post('http://localhost:5000/tasks', newTask);
          setTaskTitle('');
          setTaskDisp('');
          fetchTasks();
          
      } catch (error) {
          console.error("Error adding task:", error);
      }
  };


    const updateTask = async (id) => {
      if (!taskTitle.trim() || !taskDisp.trim()) return;
  
      try {
          await axios.put(`http://localhost:5000/tasks/${id}`, { title: taskTitle, disp: taskDisp });
          setTaskTitle('');
          setTaskDisp('');
          setEditingTaskId(null);
          fetchTasks(); 
      } catch (error) {
          console.error("Error updating task:", error);
      }
  };
  

  

  const deleteTask = async (id) => {
    const userConfirmed = window.confirm("Are you sure you want to delete?");
    if (userConfirmed) {
        try {
            await axios.delete(`http://localhost:5000/tasks/${id}`);
            fetchTasks(); 
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }
};

  

  return (
    <>
    
    <NavBar />
      
      <div style={{ padding: '20px' }}>
        
            <h1 className='heading'>Welcome, {userDetail.userName}</h1>
            <button type="button" className="btn btn-primary add" data-bs-toggle="modal" data-bs-target="#exampleModal" >Add Task</button>

      
            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">{editingTaskId ? 'Edit Task' : 'Add Task'}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="mb-3">
                          <label  className="col-form-label">Title:</label>
                          <input type="text" className="form-control" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} id="recipient-name" placeholder='Add Title' />
                        </div>
                        <div className="mb-3">
                          <label className="col-form-label">Discription:</label>
                          <textarea className="form-control" id="message-text" value={taskDisp} onChange={(e) => setTaskDisp(e.target.value)} placeholder='Add Discription'></textarea>
                        </div>
                      </form>
                    </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => { editingTaskId ? updateTask(editingTaskId) : addTask(); }}>
                      {editingTaskId ? 'Update ' : 'Add '}
                    </button>
                  </div>
                </div>
              </div>
            </div>



              <div className="row">
                {tasks.map((task) => (
                <div key={task.id} className="col-md-3 mb-4 yyy">
                  <div className="card h-100" >
                    <div className="card-body" style={{backgroundColor: task.color}}>
                        <h5 className="card-title">{task.title}</h5>
                        <p className="card-text">{task.disp}</p>
                        <div className="d-flex justify-content-between">
                            <button
                                className="btn btn-secondary"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => {
                                    setEditingTaskId(task.id);
                                    setTaskTitle(task.title);
                                    setTaskDisp(task.disp);
                                }}
                            >
                                Edit
                            </button>
                            <button className="btn btn-danger" onClick={() => deleteTask(task.id)} >
                                Delete
                            </button>
                        </div>
                    </div>
                  </div>
                </div>
                  ))}
              </div>
      </div>
              
      
      

      
    

    

    </>
  );
}

export default TaskForm;
