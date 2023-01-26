import React, { useEffect, useState } from "react";
import { BsFillSunFill } from "react-icons/bs";
import { HiMoon } from "react-icons/hi";

const Header = ({ changeTheme }) => {
    const [ThemeLight, setThemeLight] = useState(true);
    const body = document.querySelector("body");
    const main = document.querySelector("main");
    useEffect(() => {
        return () => {
            toggleTheme();
        }
    }, [ThemeLight]);
    
    const toggleTheme = () => {
        if(ThemeLight) {
            changeTheme("light");
            body.style.backgroundColor = "hsl(236, 33%, 92%)";
            main.classList.add("light");
            main.classList.remove("dark");
        } else {
            changeTheme("dark");
            body.style.backgroundColor = "hsl(235, 21%, 11%)";
            main.classList.add("dark");
            main.classList.remove("light");
        }
    }
    return (
        <div className="header-task">
            <h1> T O D O</h1>
            <div className="theme-box">
                {
                    ThemeLight ?
                    <BsFillSunFill className="icon" onClick={() =>setThemeLight(false)} />

                    : <HiMoon className="icon" onClick={() => setThemeLight(true)} />
                }
            </div>
        </div>
    )
}

export default Header