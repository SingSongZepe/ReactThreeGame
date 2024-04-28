import React from 'react';
import turtle_icon from "./res/img/assets/turtle.svg";
import "./Header.css";

function Header({ onOptionChange }) {
    const handleLink = (url) => {
        onOptionChange(url);
    };

    return (
        <div 
            className="header" 
            >
            <img src={turtle_icon} alt="logo" className="logo"/>
            <div className='sites'>
                <span 
                    onClick={() => handleLink("/")}
                    className="site" 
                    >
                    Home
                </span>

                <span key="space1"> | </span>

                <span 
                    onClick={() => handleLink("/blanko")}
                    className="site" 
                    >
                    Blanko
                </span>

                <span key="space2"> | </span>

                <span 
                    onClick={() => handleLink("/slido")}
                    className="site" 
                    >
                    Slido
                </span>

                <span key="space3"> | </span>

                <span 
                    onClick={() => handleLink("/tetro")}
                    className="site" 
                    >
                    Tetro
                </span>
            </div>
        </div>
    );
}

export default Header;