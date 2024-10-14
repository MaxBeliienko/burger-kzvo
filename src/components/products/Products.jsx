import React, { useState, useRef, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import "./Products.css";

const Products = ({ selectedCategory, addToCart, openProductModal }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const sliderRef = useRef(null);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const settings = {
    className: "center",
    infinite: products.length > 3,
    slidesToShow: 2,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
    dots: true,
  };

  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(`/products/${selectedCategory.category_id}`)
        .then((response) => {
          setProducts(response.data);
          if (sliderRef.current) {
            sliderRef.current.slickGoTo(0);
          }
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  }, [selectedCategory]);

  return (
    <div className="carousel-container">
      <Slider {...settings} ref={sliderRef}>
        {products.map((product, index) => (
          <div
            className={`product ${
              selectedProduct === product.product_name ? "selected-product" : ""
            }`}
            key={index}
            // onClick={() => {
            //   handleAddToCart(product);
            //   setSelectedProduct(product.product_name);
            //   setTimeout(() => setSelectedProduct(null), 100);
            // }}
            onClick={() => openProductModal(product)}
          >
            <img src={product.photo} alt={product.product_name} />
            <div className="product-name">{product.product_name}</div>
            <div className="product-price">{product.price} ГРН</div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Products;
