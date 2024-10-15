import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "../styles/PaymentResult.css";
import axios from "../api";
import { useTranslation } from "react-i18next";

function PaymentResult() {
  const [success, setSuccess] = useState(null); // добавляем состояние для success, изначально null
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    // GET запрос на /last для получения true или false
    axios
      .get("/payment/last")
      .then((response) => {
        setSuccess(response.data); // предполагаем, что возвращается просто true или false
      })
      .catch((error) => {
        console.error("Ошибка при получении данных о заказе:", error);
        setSuccess(false); // Если запрос не удался, считаем, что это ошибка
      });
  }, []); // Выполнить только один раз при монтировании компонента

  useEffect(() => {
    if (success === false) {
      const timeout = setTimeout(() => {
        navigate("/payment");
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [success, navigate]);

  useEffect(() => {
    if (success === true) {
      axios
        .delete("/order/delete")
        .then(() => {
          console.log("Товары удалены с бэкенда");
        })
        .catch((error) => {
          console.error("Ошибка при удалении товаров с бэкенда:", error);
        });

      localStorage.removeItem("selectedItems");

      const timeout = setTimeout(() => {
        navigate("/");
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [success, navigate]);

  if (success === null) {
    return (
      <div className="loading-container">
        <div className="loading-message">
          <h2>{t("description.paymentResult.ProcessingPayment")}...</h2>
          <div className="loader"></div>{" "}
          {/* Можно добавить анимацию загрузки */}
        </div>
      </div>
    );
  }

  return (
    <div className="payment-result-container">
      {success ? (
        <div className="payment-success">
          <FaCheckCircle className="payment-icon success" />
          <h2 className="payment-message">
            {t("description.paymentResult.PaymentSuccessful")}
          </h2>
        </div>
      ) : (
        <div className="payment-failure">
          <FaTimesCircle className="payment-icon failure" />
          <h2 className="payment-message">
            {t("description.paymentResult.PaymentFailed")}
          </h2>
        </div>
      )}
    </div>
  );
}

export default PaymentResult;
