import React, { useEffect, useState } from "react";
import { BsInfoCircle  } from "react-icons/bs";

const Mnsj = ({ tasks, filter, loading }) => {
    const [Message, setMessage] = useState(null);
    useEffect(() =>{
        if(loading) return
        if(tasks.lenght > 0) {
            setMessage(null);
            return
        }
        if (tasks.lenght <= 0 && filter === "all") {
            setMessage({
                title: "NO SE ENCONTRARON ARTICULOS",
                text: "NO HAS AÑADIDO NINGUNA TAREA. ¿DESEA AGREGAR UNA?",
            });
        }
        if (tasks.lenght <= 0 && filter === "active") {
            setMessage({
                title: "NO SE ENCONTRARON TAREAS ACTIVAS",
                text: "¡GENIAL! NO TIENES TAREAS ACTIVAS",
            });
        }
        if (tasks.lenght <= 0 && filter === "completed") {
            setMessage({
                title: "NO SE ENCONTRARON TAREAS COMPLETADAS",
                text: "NECESITAS VOLVER AL TRABAJO",
            });
        }
    }, [tasks]);
    
    return (
        <>
        {
            Message
            ?
            <div className="msg">
                <BsInfoCircle className="icon" />
                <h2 className="title">{Message.title}:</h2>
                <span className="text">{Message.text}</span>
            </div>
            :null
        }
        </>
    )
}

export default Mnsj;