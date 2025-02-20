import React, { useState } from "react";
import { GoClockFill } from "react-icons/go";
import { RiShoppingCartFill } from "react-icons/ri";
import Rating from "@mui/material/Rating";
import { MdAttachMoney } from "react-icons/md";
import { FaRegHeart, FaShareAlt, FaShieldAlt } from "react-icons/fa";
import { Button, Tooltip, IconButton } from "@mui/material";
import { PiSealCheckBold } from "react-icons/pi";
import Header from "../Layout/Header";
import RelatedProduct from "../../pages/ProductDetails/RelatedProduct";


const CardDetails = () => {
  const [selectedColor, setSelectedColor] = useState('primary');
  const [quantity, setQuantity] = useState(1);

  const colors = [
    { id: 'primary', class: 'bg-primary', label: 'Blue' },
    { id: 'success', class: 'bg-success', label: 'Green' },
    { id: 'danger', class: 'bg-danger', label: 'Red' },
    { id: 'warning', class: 'bg-warning', label: 'Yellow' },
    { id: 'info', class: 'bg-info', label: 'Light Blue' }
  ];

  return (
    <>
      <Header />
      <div className="product-details-container">
        <div className="container py-5">
          <div className="row">
            {/* Product Images Section */}
            <div className="col-md-6 mb-4">
              <div className="product-image-gallery">
                <div className="main-image">
                  <img
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/w/a/watch_se_44.png"
                    alt="Apple Watch Series 5"
                    className="img-fluid"
                  />
                </div>
                <div className="thumbnail-images mt-3">
                  {/* Add thumbnail images here */}
                </div>
              </div>
            </div>

            {/* Product Info Section */}
            <div className="col-md-6">
              <div className="product-info">
                <div className="product-header">
                  <h2 className="product-title">Apple Watch Series 5</h2>
                  <div className="brand-link">
                    By <a href="#">Apple</a>
                  </div>
                </div>

                <div className="product-price-rating">
                  <div className="price">$499.99</div>
                  <div className="rating-wrapper">
                    <Rating value={4} readOnly precision={0.5} />
                    <span className="rating-count">(245 Reviews)</span>
                  </div>
                </div>

                <div className="product-status">
                  <span className="stock-status in-stock">
                    <i className="fas fa-check-circle"></i> In Stock
                  </span>
                </div>

                <div className="product-description">
                  <p>
                    GPS, Always-On Retina display, 30% larger screen, Swimproof, ECG app, 
                    Electrical and optical heart sensors, Built-in compass, Elevation, 
                    Emergency SOS, Fall Detection, S5 SiP with up to 2x faster 64-bit 
                    dual-core processor.
                  </p>
                </div>

                <div className="product-features">
                  <div className="feature-item">
                    <RiShoppingCartFill />
                    <span>Free Shipping</span>
                  </div>
                  <div className="feature-item">
                    <MdAttachMoney />
                    <span>EMI Available</span>
                  </div>
                </div>

                <div className="product-colors">
                  <h6>Colors</h6>
                  <div className="color-options">
                    {colors.map((color) => (
                      <Tooltip key={color.id} title={color.label}>
                        <div
                          className={`color-option ${color.class} ${
                            selectedColor === color.id ? 'selected' : ''
                          }`}
                          onClick={() => setSelectedColor(color.id)}
                        />
                      </Tooltip>
                    ))}
                  </div>
                </div>

                <div className="quantity-selector">
                  <Button 
                    variant="outlined" 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="quantity">{quantity}</span>
                  <Button 
                    variant="outlined" 
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>

                <div className="product-actions">
                  <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<RiShoppingCartFill />}
                    className="add-to-cart-btn"
                  >
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={<FaRegHeart />}
                    className="wishlist-btn"
                  >
                    Wishlist
                  </Button>
                  <IconButton className="share-btn">
                    <FaShareAlt />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>

          {/* Product Features Section */}
          <div className="product-features-grid mt-5">
            <div className="row">
              <div className="col-md-4">
                <div className="feature-card">
                  <PiSealCheckBold className="feature-icon" />
                  <h4>100% Original</h4>
                  <p>Guaranteed authentic products directly from authorized retailers</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="feature-card">
                  <GoClockFill className="feature-icon" />
                  <h4>10 Day Replacement</h4>
                  <p>Easy replacement policy for defective products within 10 days</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="feature-card">
                  <FaShieldAlt className="feature-icon" />
                  <h4>1 Year Warranty</h4>
                  <p>Comprehensive warranty coverage for peace of mind</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          <RelatedProduct />
        </div>
      </div>
    </>
  );
};

export default CardDetails;
