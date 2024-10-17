import React, { useState, useRef, useEffect } from "react";
import axios from "../../api";
import { useNavigate } from "react-router-dom";
import { BsTrash3Fill } from "react-icons/bs";
import "./ShoppingCart.css";
import { useTranslation } from "react-i18next";

const ShoppingCart = ({ selectedItems, setSelectedItems, updateCartItems }) => {
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const { t } = useTranslation();
  console.log(total);

  useEffect(() => {
    axios
      .get("/order")
      .then((response) => {
        console.log("Order data:", response.data);
        setCartItems(response.data.products);
        setTotal(response.data.totalPrice);
      })
      .catch((error) => {
        console.error("Error fetching order:", error);
      });
  }, [selectedItems, updateCartItems]);

  const navigate = useNavigate();

  const handlePayment = () => {
    navigate("/payment");
  };

  const hasItemsInCart = selectedItems.length > 0;

  const [showDeleteModal, setShowDeleteModal] = useState(false); // модалка для видалення
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleDeleteItemWithModal = (item) => {
    setDeleteIndex(cartItems.findIndex((i) => i.productId === item));
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (deleteIndex !== null) {
      const itemToDelete = cartItems[deleteIndex];
      const deleteData = { modification: itemToDelete.modification || [] };

      axios
        .delete(`/order/delete/modification/${itemToDelete.productId}`, {
          data: deleteData,
        })
        .then((response) => {
          console.log("Item successfully deleted");
          // Оновлюємо замовлення після видалення
          return axios.get("/order");
        })
        .then((response) => {
          console.log("Order data updated:", response.data);
          setCartItems(response.data.products);
          setTotal(response.data.totalPrice);
        })
        .catch((error) => {
          console.error("Error deleting item or fetching order:", error);
        })
        .finally(() => {
          setDeleteIndex(null);
          setShowDeleteModal(false);
        });
    }
  };

  const handleCancelDelete = () => {
    setDeleteIndex(null);
    setShowDeleteModal(false);
  };

  const handleIncreaseQuantity = (item) => {
    const updatedItems = cartItems.map((i) =>
      i.productId === item.productId ? { ...i, count: i.count + 1 } : i
    );
    setCartItems(updatedItems);

    axios
      .put(`/order`, { id: item.productId, quantity: item.count + 1 })
      .then((response) => {
        console.log("Quantity successfully increased");
        // Оновлюємо дані після зміни кількості
        return axios.get("/order");
      })
      .then((response) => {
        setCartItems(response.data.products);
        setTotal(response.data.totalPrice);
      })
      .catch((error) => {
        console.error("Error updating quantity or fetching order:", error);
      });
  };

  const handleDecreaseQuantity = (item) => {
    if (item.count > 1) {
      // Оновлюємо локальні дані
      const updatedItems = cartItems.map((i) =>
        i.productId === item.productId ? { ...i, count: i.count - 1 } : i
      );
      setCartItems(updatedItems);

      // Відправляємо запит для оновлення кількості на сервері
      axios
        .put(`/order`, { id: item.productId, quantity: item.count - 1 })
        .then((response) => {
          console.log("Quantity successfully decreased");
          // Після успішного оновлення кількості отримуємо актуальні дані
          return axios.get("/order");
        })
        .then((response) => {
          // Оновлюємо замовлення та загальну суму
          setCartItems(response.data.products);
          setTotal(response.data.totalPrice);
        })
        .catch((error) => {
          console.error("Error decreasing quantity or fetching order:", error);
        });
    }
  };

  return (
    <div className="shopping-cart">
      <h2>{t("description.shoppingCart.Title")}</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index} className="cart-item">
            <img
              src={item.productPhoto}
              alt={item.productName}
              className="cart-item-image"
            />
            <div>
              <div className="order-name" lang="uk">
                {item.productName}
              </div>
              <div>
                {item.allPrice} {t("description.shoppingCart.Currency")}
              </div>
              <div className="quantity-container">
                <button
                  className="quantity-btn"
                  onClick={() => handleDecreaseQuantity(item)}
                >
                  -
                </button>
                <span>{item.count}</span>
                <button
                  className="quantity-btn"
                  onClick={() => handleIncreaseQuantity(item)}
                >
                  +
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteItemWithModal(item.productId)}
                >
                  <BsTrash3Fill />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="total">
        <p className="total-text">
          {t("description.shoppingCart.OrderAmount")}:
        </p>
        <p className="total-amount">
          {total} {t("description.shoppingCart.Currency")}
        </p>
      </div>
      <div className="payment-container">
        <button
          className={`pay-button ${!hasItemsInCart ? "disabled" : ""}`}
          onClick={handlePayment}
          disabled={!hasItemsInCart}
        >
          {t("description.shoppingCart.Pay")}
        </button>
      </div>

      {showDeleteModal && (
        <div className={`modal active`}>
          <div className="modal-content">
            <p className="modal-header">
              {t("description.shoppingCart.SureRemove")}
            </p>
            <div className="modal-buttons">
              <button className="modal-button" onClick={handleConfirmDelete}>
                {t("description.shoppingCart.Yes")}
              </button>
              <button className="modal-button" onClick={handleCancelDelete}>
                {t("description.shoppingCart.No")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
