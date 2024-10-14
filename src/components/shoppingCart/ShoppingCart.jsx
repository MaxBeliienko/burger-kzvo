import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsTrash3Fill } from "react-icons/bs";
import "./ShoppingCart.css";

const ShoppingCart = ({ selectedItems, setSelectedItems, updateCartItems }) => {
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .get("/order")
      .then((response) => {
        // console.log("Order data:", response.data);
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

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleDeleteItemWithModal = (item) => {
    setDeleteIndex(cartItems.findIndex((i) => i.productId === item));
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (deleteIndex !== null) {
      const itemToDelete = cartItems[deleteIndex];
      axios
        .delete(`/order/delete/${itemToDelete.productId}`)
        .then((response) => {
          console.log("Item successfully deleted");
          const updatedItems = selectedItems.filter(
            (i) => i.product_id !== itemToDelete.productId
          );
          setSelectedItems(updatedItems);
          localStorage.setItem("selectedItems", JSON.stringify(updatedItems));
          const updatedCartItems = cartItems.filter(
            (item) => item.productId !== itemToDelete.productId
          );
          setCartItems(updatedCartItems);
          const updatedTotal = updatedCartItems.reduce(
            (total, item) => total + item.price * item.count,
            0
          );
          setTotal(updatedTotal);
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
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
    const updatedTotal = updatedItems.reduce(
      (total, item) => total + item.price * item.count,
      0
    );
    setTotal(updatedTotal);

    axios
      .put(`/order`, { id: item.productId, quantity: item.count + 1 })
      .then((response) => {
        console.log("Quantity successfully increased");
      })
      .catch((error) => {
        console.error("Error increasing quantity:", error);
      });
  };

  const handleDecreaseQuantity = (item) => {
    if (item.count > 1) {
      const updatedItems = cartItems.map((i) =>
        i.productId === item.productId ? { ...i, count: i.count - 1 } : i
      );
      setCartItems(updatedItems);
      const updatedTotal = updatedItems.reduce(
        (total, item) => total + item.price * item.count,
        0
      );
      setTotal(updatedTotal);

      axios
        .put(`/order`, { id: item.productId, quantity: item.count - 1 })
        .then((response) => {
          console.log("Quantity successfully decreased");
        })
        .catch((error) => {
          console.error("Error decreasing quantity:", error);
        });
    }
  };

  return (
    <div className="shopping-cart">
      <h2>Ваше замовлення</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={item.productId} className="cart-item">
            <img
              src={item.productPhoto}
              alt={item.productName}
              className="cart-item-image"
            />
            <div>
              <div className="order-name" lang="uk">
                {item.productName}
              </div>
              <div>{item.price * item.count} ГРН</div>
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
        <p className="total-text">Сума замовлення:</p>
        <p className="total-amount">{total} ГРН</p>
      </div>
      <div className="payment-container">
        <button
          className={`pay-button ${!hasItemsInCart ? "disabled" : ""}`}
          onClick={handlePayment}
          disabled={!hasItemsInCart}
        >
          Оплатити
        </button>
      </div>

      {showDeleteModal && (
        <div className={`modal active`}>
          <div className="modal-content">
            <p className="modal-header">
              Ви впевнені, що хочете видалити товар?
            </p>
            <div className="modal-buttons">
              <button className="modal-button" onClick={handleConfirmDelete}>
                Так
              </button>
              <button className="modal-button" onClick={handleCancelDelete}>
                Ні
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
