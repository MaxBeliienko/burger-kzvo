import React from "react";
import "./PaymentModal.css";
import { useTranslation } from "react-i18next";

function PaymentModal({ isOpen, onClose }) {
  const { t } = useTranslation();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal active">
      <div className="modal-content">
        <p className="modal-header">
          {t("description.paymentModal.Instruction")}
        </p>
        <div className="loader-container">
          <div className="newtons-cradle">
            <div className="newtons-cradle__dot"></div>
            <div className="newtons-cradle__dot"></div>
            <div className="newtons-cradle__dot"></div>
            <div className="newtons-cradle__dot"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
