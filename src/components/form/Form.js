import React, {useEffect, useState} from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { toast } from "react-toastify"

const Form = () => {
    const [task, setTask] = useState("")
    const [data, setData] = useState(JSON.parse(localStorage.getItem("data")) || [])
    const [id, setId] = useState(1)
    const [editTask, setEditTask] = useState({id: null, task: ""})

    const handleSubmit = (e) => {
        if (task.length > 10) {
            setTask(task.slice(0, 10))
            console.log(task);
        }
        e.preventDefault();
        if (!task.trim()) return toast.error("Input field can't be empty")
        toast.success("Successfully added")
        let todo = {
            task,
            id: id
        }
        setId(id + 1)
        setData([...data, todo])
        setTask("")
    }   

    useEffect(()=>{
        localStorage.setItem("data", JSON.stringify(data))
    }, [data])

    const handleDelete = (taskId) => {
        const newData = data.filter((item) => item.id !== taskId)
        setData(newData);
        toast.warn("Now you are deleted your task!")
    }

    const handleClear = () => {
        if (data.length == []) {
            return toast.error("Nothing to clear")
        }
        setData([])
        return toast.success("Cleared")
    }

    const handleEdit = (taskId) => {
        const taskToEdit = data.find((item) => item.id === taskId);
        setEditTask({ id: taskId, task: taskToEdit.task });
    };

    const handleSave = () => {
        const newData = data.map((item) => {
            if (item.id === editTask.id) {
                toast.success("Successfully edited")
                return { ...item, task: editTask.task };
            }
            return item;
        });
        setData(newData);
        setEditTask({ id: null, task: '' });
    };

    let now = new Date()

    let todos = data?.map((el, i)=>(
        <div key={i} className="task">
            <div className="rask__left">
                {el.id === editTask.id ? (
                    <input
                        type="text"
                        required
                        value={editTask.task}
                        onChange={(e) => setEditTask({ ...editTask, task: e.target.value })}
                    />
                ) : (
                <p>{el.task}</p>
                )}
            </div>
            <div className="task__actions">
            {el.id === editTask.id ? (
                    <button className='save-btn' onClick={handleSave}>Save</button>
                ) : (
                    <>
                        <p>{now.getHours() < 10 ? "0" + now.getHours() : now.getHours()} : {now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()}</p>
                        <button onClick={() => handleEdit(el.id)}> <CiEdit/> </button>
                        <button className='remove' onClick={() => handleDelete(el.id)}> <RiDeleteBin6Line/> </button>
                    </>
                )}
            </div>
        </div>
    ))
  return (
    <div className='todo'>
        <form onSubmit={handleSubmit}>
            <div className="form__input">
                <input value={task} onChange={(event)=>setTask(event.target.value)} type="text" placeholder='Enter your task!'/>
                <button disabled={task.length > 85} type='submit'>Add</button>
            </div>
        </form>
        <div className="tasks">
            {todos}
            <div className="clear">
                <button onClick={() => handleClear()}>Clear All</button>
            </div>
        </div>
    </div>
  )
}

export default Form