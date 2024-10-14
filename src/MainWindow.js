import React, { useState, useEffect } from "react";
import "./MainWindow.css";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaAngleLeft } from "react-icons/fa6";
import axios from "axios";
import Categories from "./components/categories/Categories";
import Products from "./components/products/Products";
import IngredientsModal from "./components/ingredientsModal/IngredientsModal";
import ShoppingCart from "./components/shoppingCart/ShoppingCart";

// axios.defaults.baseURL = "http://localhost:8080/api";
axios.defaults.baseURL = "http://192.168.0.222:3535/api";

function MainWindow() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // Для відслідковування продукту в модалці
  const [selectedItems, setSelectedItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

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

  const handleOpenProductModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
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
          <FaAngleLeft /> Назад
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
          addToCart={handleAddToCart}
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
