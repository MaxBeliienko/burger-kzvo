import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StartWindow.css';

function StartWindow() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/main');
    };

    return (
        <div className="start-window" onClick={handleClick}>
            <div className="advertisement"></div>
            <div className="start-button">
                Натисніть, щоб зробити замовлення
            </div>
        </div>
    );
}

export default StartWindow;
