import React, { useState, useRef, useEffect } from "react";
import "./IngredientsModal.css";

const IngredientsModal = ({ product, onClose, addToCart }) => {
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    if (product && Array.isArray(product.group_modifications)) {
      // Отримуємо інгредієнти з об'єкта product
      const mods = product.group_modifications.flatMap(
        (group) => group.modifications
      );
      const modsWithAmounts = mods.map((mod) => ({
        ...mod,
        amount: 0, // Встановлюємо початкову кількість інгредієнта
      }));
      setIngredients(modsWithAmounts);
    }
  }, [product]);

  const handleQuantityChange = (ingredientId, change) => {
    // Змінюємо кількість вибраного інгредієнта
    const updatedIngredients = ingredients.map((ingredient) =>
      ingredient.modification_id === ingredientId
        ? { ...ingredient, amount: Math.max(0, ingredient.amount + change) }
        : ingredient
    );
    setIngredients(updatedIngredients);
  };

  const handleAddToCart = () => {
    if (!product || !product.group_modifications) {
      addToCart(product); // Додаємо продукт без модифікацій
      onClose(); // Закриваємо модальне вікно
      return;
    }

    const selectedModifications = ingredients.map((ingredient) => ({
      m: ingredient.dish_modification_id, // dish_modification_id
      a: ingredient.amount, // кількість
    }));

    const productToSend = {
      product_id: product.product_id, // Додаємо product_id
      quantity: 1, // Кількість товару
      modifications: selectedModifications, // обрані модифікації
    };

    addToCart(productToSend);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{product.product_name}</h2>
        <h3>Інгредієнти</h3>
        <ul>
          {ingredients.map((ingredient) => (
            <li key={ingredient.ingredient_id}>
              {ingredient.name}{" "}
              {/* <button
                onClick={() =>
                  handleRemoveIngredient(ingredient.modification_id)
                }
              >
                Видалити
              </button> */}
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() =>
                    handleQuantityChange(ingredient.modification_id, -1)
                  }
                >
                  -
                </button>
                <span className="quantity-value">{ingredient.amount}</span>
                <button
                  className="quantity-btn"
                  onClick={() =>
                    handleQuantityChange(ingredient.modification_id, 1)
                  }
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="modal-buttons-ing">
          <button onClick={handleAddToCart} className="modal-button-add">
            Додати до кошика
          </button>
          <button onClick={onClose} className="modal-button-close">
            Закрити
          </button>
        </div>
      </div>
    </div>
  );
};

export default IngredientsModal;
