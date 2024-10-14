import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import "./Categories.css";
import React, { useState, useRef, useEffect } from "react";

const Categories = ({ onSelectCategory, selectedCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("/products")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const settings = {
    className: "center",
    infinite: categories.length > 3,
    slidesToShow: 2,
    speed: 500,
    rows: 3,
    slidesPerRow: 1,
    dots: true,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {categories.map((category, index) => (
          <div
            className={`category ${
              selectedCategory &&
              selectedCategory.category_id === category.category_id
                ? "selected-category"
                : ""
            }`}
            key={index}
            onClick={() => onSelectCategory(category)}
          >
            <img src={category.category_photo} alt={category.category_name} />
            <div>{category.category_name}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Categories;
