import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/StartWindow.css";
import { useTranslation } from "react-i18next";

function StartWindow() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    navigate("/main");
  };

  return (
    <div className="start-window" onClick={handleClick}>
      <div className="advertisement"></div>
      <div className="start-button">{t("description.startWindow.Click")}</div>
    </div>
  );
}

export default StartWindow;
