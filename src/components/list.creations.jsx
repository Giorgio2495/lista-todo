import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { BsCheck } from 'react-icons/bs';
import { VscChromeClose } from "react-icons/vsc";
import { deleteDoc, updateDoc, doc } from 'firebase/firestore';
import store from '../firebase/firebase.config';

const List = ({ list }) => {
    const [List, setList] = useState(null);

    useEffect(() => {
        setList(list);
    }, [list]);

    const handleDrag = (result) => {
        const { source, destination } = result;
        if (!destination) return;
        if (destination.index === source.index && destination.droppableId === source.droppableId) return;
        setList(List => reorder(List, source.index, destination.index));
    }

    const reorder = (list, sourceIndex, destinationIndex) => {
        const result = [...list];
        const [removed] = result.splice(sourceIndex, 1);
        result.splice(destinationIndex, 0, removed);
        return result;
    }

    const updateCompleted = async (e) => {
        const taskRef = doc(store, "tasks", e.target.id);
        await updateDoc(taskRef, { completed: e.target.checked });
    }

    const deleteTask = (id) => {
        deleteDoc(doc(store, "tasks", id));
    }

    return (
        List ?
            <DragDropContext onDragEnd={(result => handleDrag(result))}>
                <Droppable droppableId="task" key={List.lenght}>
                    {(droppableProvider) =>
                    (<div
                        {...droppableProvider.droppableProps}
                        ref={droppableProvider.innerRef}
                        className="list-task">
                        {
                            List.map((task, id) => (
                                <Draggable
                                    draggableId={task.index.toString()}
                                    index={id}
                                    key={task.id}>
                                    {(draggableProvider) => (
                                        <div
                                            {...draggableProvider.draggableProps}
                                            ref={draggableProvider.innerRef}
                                            {...draggableProvider.dragHandleProps}
                                            className="task-item">
                                            <input
                                                type="checkbox"
                                                id={task.id}
                                                defaultChecked={task.completed}
                                                onChange={updateCompleted} />
                                            <label htmlFor={task.id}>
                                                <BsCheck className="icon" />
                                                <span>{task.task}</span>
                                            </label>
                                            <VscChromeClose
                                                className="icon-close"
                                                onClick={() => deleteTask(task.id)} />
                                        </div>
                                    )}
                                </Draggable>
                            ))
                        }
                        {droppableProvider.placeholder}
                    </div>)
                    }
                </Droppable>
            </DragDropContext>
            : <span>Cargando...</span>

    )

}

export default List;