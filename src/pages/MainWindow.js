import React, { useState, useEffect } from "react";
import "../styles/MainWindow.css";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";
import axios from "../api";
import Categories from "../components/categories/Categories";
import Products from "../components/products/Products";
import IngredientsModal from "../components/ingredientsModal/IngredientsModal";
import ShoppingCart from "../components/shoppingCart/ShoppingCart";
import { useTranslation } from "react-i18next";

function MainWindow() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // Для відслідковування продукту в модалці
  const [selectedItems, setSelectedItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false); // Для відкритя модалки модифікацій

  const navigate = useNavigate();

  const { t } = useTranslation();
  const updateCartItems = () => {
    axios
      .get("/order")
      .then((response) => {
        console.log("Order data:", response.data);
        setCartItems(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching order:", error);
      });
  };

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("selectedItems"));
    if (storedItems) {
      setSelectedItems(storedItems);
    }
  }, []);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  // const handleOpenProductModal = (product) => {
  //   setSelectedProduct(product);
  //   setShowModal(true);
  // };

  const handleOpenProductModal = (product) => {
    if (product.group_modifications && product.group_modifications.length > 0) {
      // Якщо є модифікації, відкриваємо модальне вікно
      setSelectedProduct(product);
      setShowModal(true);
    } else {
      // Якщо модифікацій немає, додаємо продукт прямо в корзину
      handleAddToCart(product);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    const existingItemIndex = selectedItems.findIndex(
      (item) => item.product_id === product.product_id
    );

    if (existingItemIndex !== -1) {
      const updatedItems = [...selectedItems];
      updatedItems[existingItemIndex].quantity += 1;
      setSelectedItems(updatedItems);
      localStorage.setItem("selectedItems", JSON.stringify(updatedItems));
    } else {
      const updatedItems = [...selectedItems, { ...product, quantity: 1 }];
      setSelectedItems(updatedItems);
      localStorage.setItem("selectedItems", JSON.stringify(updatedItems));
    }

    const orderData = {
      id: product.product_id,
      quantity: 1,
      modifications: product.modifications || [],
    };

    axios
      .post("/order", orderData)
      .then((response) => {
        console.log("Order successfully sent");
        updateCartItems();
      })
      .catch((error) => {
        console.error("Error sending order:", error);
      });
  };

  return (
    <div className="menu-container">
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate("/")}>
          <FaAngleLeft /> {t("description.mainWindow.Back")}
        </button>
      </div>
      <div className="categories-container">
        <Categories
          onSelectCategory={handleSelectCategory}
          selectedCategory={selectedCategory}
        />
      </div>
      <div className="products-container">
        <Products
          selectedCategory={selectedCategory}
          openProductModal={handleOpenProductModal}
        />
      </div>
      <div className="cart-container">
        <ShoppingCart
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          updateCartItems={updateCartItems}
        />
      </div>

      {showModal && selectedProduct && (
        <IngredientsModal
          product={selectedProduct}
          onClose={handleCloseModal}
          addToCart={handleAddToCart}
        />
      )}
    </div>
  );
}

export default MainWindow;
