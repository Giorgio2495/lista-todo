import React, { useEffect, useState } from "react";
import './sass/index.scss';
import { collection, onSnapshot } from "firebase/firestore";
import store from "./firebase/firebase.config";
import AddCreations from './components/add.creations';
import ListCreations from './components/list.creations';
import ConfigCreations from './components/config.creations';
import HeaderCreations from './components/header.creations';
import FooterCreations from './components/footer.creations';
import MnsjCreations from './components/mnsj.creations';
import HeaderDarkMobile from './assets/img/bg-mobile-dark.jpg';
import HeaderDarkDesktop from './assets/img/bg-desktop-dark.jpg';
import HeaderLightMobile from './assets/img/bg-mobile-light.jpg';
import HeaderLightDesktop from './assets/img/bg-desktop-light.jpg';
import { BiLoaderAlt } from "react-icons/bi";


const App = () => {
    const [Tasks, setTasks] = useState([]);
    const [TasksAll, setTasksAll] = useState([]);
    const [Theme, setTheme] = useState("dark");
    const [Id, setId] = useState(null);
    const [CurrentFilter, setCurrentFilter] = useState("all");
    const [Reset, setReset] = useState(false);
    const [Loading, setLoading] = useState(true);
    useEffect(() => {
        onSnapshot(collection(store, "tasks"), (snapshot) => {
            let temp = [];
            snapshot.docs.forEach((doc) => {
                temp.push({ ...doc.data(), id: doc.id });
            });
            setLoading(false);
            setTasks(temp);
            setTasksAll(temp);

            const completed = temp.filter((task) => task.completed);
            let arrCompleted = [];
            completed.forEach((item) => {
                arrCompleted.push(item.id);
            });
            setCompleted(arrCompleted);
        });
    }, []);

    const setCompleted = (newId) => setId(newId);

    const changeTheme = (newTheme) => setTheme(newTheme);

   /* const getAllTasks = () => (setTasks(TasksAll), setCurrentFilter("all"));*/
   const getAllTasks = () => {
    setTasks(TasksAll)
    setCurrentFilter("all")
   }

    /*const getActiveTasks = (activeTasks) => (setTasks(activeTasks), setCurrentFilter("active"));*/
   const getActiveTasks = (activeTasks) => {
    setTasks(activeTasks)
    setCurrentFilter("active")
   }

    /*const getCompletedTasks = (completedTasks) => (setTasks(completedTasks), setCurrentFilter("completed"));*/
    const getCompletedTasks = (completedTasks) => {
        setTasks(completedTasks)
        setCurrentFilter("completed")
    }

    const reset = (isReset) => setReset(isReset);

    return (
        <>
            <img src={HeaderDarkDesktop} className="img-dark-desktop" alt="desktop header dark" />
            <img src={HeaderDarkMobile} className="img-dark-mobile" alt="mobile header dark" />
            <img src={HeaderLightDesktop} className="img-light-desktop" alt="desktop header light" />
            <img src={HeaderLightMobile} className="img-light-mobile" alt="mobile header light" />

            <div className={"content " + Theme}>
                <HeaderCreations changeTheme={changeTheme} />
                <AddCreations countTask={Tasks.length} setReset={reset} reset={Reset} />
                {Loading ?
                    <div className="loading">
                        <h2>Cargando...</h2>
                        <BiLoaderAlt className="icon-loading" />
                    </div>
                    : null}
                <MnsjCreations tasks={Tasks} filter={CurrentFilter} loading={Loading} />
                <ListCreations list={Tasks} />
                <ConfigCreations
                    numTasks={Tasks.length}
                    completed={Id}
                    staticTasks={TasksAll}
                    getAll={getAllTasks}
                    getActive={getActiveTasks}
                    getCompleted={getCompletedTasks}
                    reset={Reset} />
                <FooterCreations />
            </div>
        </>
    )
}

export default App;