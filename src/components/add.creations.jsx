import React from "react";
import store from "../firebase/firebase.config";
import { collection, addDoc } from "firebase/firestore";

const Add = ({ countTask, setReset, reset }) => {

    const addTask = async (e) => {
        e.preventDefault();
        if(e.target[0].value === "") {
            return;
        }
        const docRef = await addDoc(collection(store, "tasks"), {
            index: countTask + 1,
            task: e.target[0].value,
            completed: false,
        });
        e.target[0].value = "";
        setReset(!reset);
    }
    return (
        <form className="add-task" onSubmit={addTask}>
            <label htmlFor="task"></label>
            <input
                type="text"
                id="task"
                placeholder="Crea una nueva tarea..."
                autoFocus autoComplete="off"
                required />
        </form>
    )
}
export default Add;