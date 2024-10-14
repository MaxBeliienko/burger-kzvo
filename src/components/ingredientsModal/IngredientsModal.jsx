import React, { useState, useRef, useEffect } from "react";

const IngredientsModal = ({ product, onClose, addToCart }) => {
  const [ingredients, setIngredients] = useState([]);
  console.log(product);
  useEffect(() => {
    if (product && product.group_modifications) {
      // Отримуємо інгредієнти з об'єкта product
      const mods = product.group_modifications.flatMap(
        (group) => group.modifications
      );
      setIngredients(mods);
    }
  }, [product]);

  const handleRemoveIngredient = (ingredientId) => {
    // Видаляємо інгредієнт зі списку
    const updatedIngredients = ingredients.filter(
      (ingredient) => ingredient.modification_id !== ingredientId
    );
    setIngredients(updatedIngredients);
  };

  const handleAddToCart = () => {
    const modifiedProduct = {
      ...product,
      group_modifications: product.group_modifications.map((group) => ({
        ...group,
        modifications: group.modifications.filter((mod) =>
          ingredients.some((ing) => ing.modification_id === mod.modification_id)
        ),
      })),
    };
    addToCart(modifiedProduct); // Додаємо до корзини продукт з модифікованими інгредієнтами
    onClose(); // Закриваємо модальне вікно
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{product.product_name}</h2>
        <h3>Інгредієнти</h3>
        <ul>
          {ingredients.map((ingredient) => (
            <li key={ingredient.modification_id}>
              {ingredient.modification_name}{" "}
              <button
                onClick={() =>
                  handleRemoveIngredient(ingredient.modification_id)
                }
              >
                Видалити
              </button>
            </li>
          ))}
        </ul>
        <div className="modal-buttons">
          <button onClick={handleAddToCart}>Додати до кошика</button>
          <button onClick={onClose}>Закрити</button>
        </div>
      </div>
    </div>
  );
};

export default IngredientsModal;
