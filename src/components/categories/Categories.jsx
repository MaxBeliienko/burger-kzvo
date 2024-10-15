import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "../../api";
import "./Categories.css";
import React, { useState, useEffect, useRef } from "react";

const Categories = ({ onSelectCategory, selectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const sliderRef = useRef(null); // useRef для слайдера

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

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0); // Повертаємо слайдер на початок
    }
  }, [selectedCategory]); // Спрацьовує після вибору категорії

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
      <Slider {...settings} ref={sliderRef}>
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
