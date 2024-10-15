import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";
import "../styles/PaymentWindow.css";
import axios from "../api";
import PaymentModal from "../components/paymentModal/PaymentModal"; // Импортируем модальное окно
import { useTranslation } from "react-i18next";

function PaymentWindow() {
  const navigate = useNavigate();
  const [order, setOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модального окна
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get("/order")
      .then((response) => {
        setOrder(response.data.products);
        setTotalPrice(response.data.totalPrice);
      })
      .catch((error) => {
        console.error("Error fetching order:", error);
      });
  }, []);

  const payData = {
    payment: totalPrice,
  };

  const handlePayment = () => {
    // Открываем модальное окно
    setIsModalOpen(true);

    axios
      .post("/payment", payData)
      .then(() => {
        localStorage.removeItem("selectedItems");
        navigate("/payment-result", { state: { success: true } });
      })
      .catch(() => {
        navigate("/payment-result", { state: { success: false } });
      });
  };

  const handleIncreaseQuantity = (item) => {
    const updatedItems = order.map((i) =>
      i.productId === item.productId ? { ...i, count: i.count + 1 } : i
    );
    setOrder(updatedItems);
    localStorage.setItem("selectedItems", JSON.stringify(updatedItems));

    const newTotalPrice = updatedItems.reduce(
      (total, item) => total + item.price * item.count,
      0
    );
    setTotalPrice(newTotalPrice);

    axios
      .put(`/order`, { id: item.productId, quantity: item.count + 1 })
      .then((response) => {
        console.log("Quantity successfully increased");
      })
      .catch((error) => {
        console.error("Error increasing count:", error);
      });
  };

  const handleDecreaseQuantity = (item) => {
    if (item.count > 1) {
      const updatedItems = order.map((i) =>
        i.productId === item.productId ? { ...i, count: i.count - 1 } : i
      );
      setOrder(updatedItems);
      localStorage.setItem("selectedItems", JSON.stringify(updatedItems));

      const newTotalPrice = updatedItems.reduce(
        (total, item) => total + item.price * item.count,
        0
      );
      setTotalPrice(newTotalPrice);

      axios
        .put(`/order`, { id: item.productId, quantity: item.count - 1 })
        .then((response) => {
          console.log("Quantity successfully decreased");
        })
        .catch((error) => {
          console.error("Error decreasing count:", error);
        });
    }
  };

  const handleDeleteItem = (index) => {
    setDeleteIndex(index);
  };

  const handleDeleteItemBackend = (productId) => {
    axios
      .delete(`/order/delete/${productId}`)
      .then((response) => {
        console.log("Item deleted successfully");
        // Оновлюємо список замовлень
        axios
          .get("/order")
          .then((response) => {
            setOrder(response.data.products);
            setTotalPrice(response.data.totalPrice);
          })
          .catch((error) => {
            console.error("Error fetching order:", error);
          });
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const handleConfirmDelete = () => {
    if (deleteIndex !== null) {
      const productIdToDelete = order[deleteIndex].productId;
      handleDeleteItemBackend(productIdToDelete);
      const updatedOrder = [...order];
      updatedOrder.splice(deleteIndex, 1);
      setOrder(updatedOrder);
      localStorage.setItem("selectedItems", JSON.stringify(updatedOrder));
      setDeleteIndex(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteIndex(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Закрываем модальное окно
  };

  return (
    <div className="payment_container">
      <div className="payment-back-button-container">
        <button className="back-button" onClick={() => navigate("/main")}>
          <FaAngleLeft /> {t("description.paymentWindow.Back")}
        </button>
      </div>
      <div>
        <h2 className="order-h2">{t("description.paymentWindow.YourOrder")}</h2>
        <div className="order-table-container">
          <table className="order-table">
            <tbody>
              {order.map((item, index) => (
                <tr key={index} className="order-item">
                  <td>
                    <img src={item.productPhoto} alt={item.productName} />
                  </td>
                  <td className="order-item-name" lang="uk">
                    {item.productName}
                    {/*Перевірка на наявність модифікацій */}
                    {item.modifications && item.modifications.length > 0 && (
                      <span className="order-item-name-span">
                        {t("description.paymentWindow.AddedIngredients")}
                      </span>
                    )}
                  </td>
                  <td className="order-item-count">
                    <button onClick={() => handleDecreaseQuantity(item)}>
                      -
                    </button>
                    {item.count}
                    <button onClick={() => handleIncreaseQuantity(item)}>
                      +
                    </button>
                  </td>
                  <td className="order-item-price">
                    {item.price * item.count}{" "}
                    {t("description.paymentWindow.Currency")}
                  </td>
                  <td className="order-item-delete">
                    <button onClick={() => handleDeleteItem(index)}>×</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="payment-total-amount">
          {t("description.paymentWindow.AmountDue")}:{" "}
          <span className="span-total">
            {totalPrice} {t("description.paymentWindow.Currency")}
          </span>
        </div>
        <button
          className={`payment-button ${order.length === 0 ? "disabled" : ""}`}
          onClick={handlePayment}
          disabled={order.length === 0}
        >
          {t("description.paymentWindow.Pay")}
        </button>
      </div>

      {deleteIndex !== null && (
        <div className={`modal active`}>
          <div className="modal-content">
            <p className="modal-header">
              {t("description.paymentWindow.SureRemove")}
            </p>
            <div className="modal-buttons">
              <button className="modal-button" onClick={handleConfirmDelete}>
                {t("description.paymentWindow.Yes")}
              </button>
              <button className="modal-button" onClick={handleCancelDelete}>
                {t("description.paymentWindow.No")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Используем компонент PaymentModal */}
      <PaymentModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default PaymentWindow;
