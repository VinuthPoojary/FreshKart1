import React from "react";
import { assets } from "../assets/assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems } = useAppContext();

  return product && (
    <div className="border border-gray-200 rounded-lg bg-white p-4 w-full h-full flex flex-col justify-between shadow-sm hover:shadow-md transition">
      <div className="group cursor-pointer flex items-center justify-center">
        <img
          className="group-hover:scale-105 transition-transform max-h-32 object-contain"
          src={product.image[0]}
          alt={product.name}
        />
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>{product.category}</p>
        <p className="text-gray-800 font-semibold text-lg truncate">
          {product.name}
        </p>

        <div className="flex items-center gap-1 mt-1">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <img
                key={i}
                className="w-4 h-4"
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                alt="rating"
              />
            ))}
          <p className="ml-1 text-xs">(4)</p>
        </div>

        <div className="flex items-end justify-between mt-3">
          <p className="text-green-600 text-base font-bold">
            {currency}${product.offerPrice}
            <span className="text-gray-400 line-through text-sm ml-1">
              {currency}${product.price}
            </span>
          </p>

          <div className="text-green-600">
            {!cartItems[product._id] ? (
              <button
                className="flex items-center justify-center gap-1 bg-green-10 border border-green-40 px-3 py-1.5 rounded text-sm font-medium hover:bg-green-200"
                onClick={() => addToCart(product._id)}
              >
                <img src={assets.cart_icon} alt="cart_icon" className="w-4 h-4" />
                Add
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 bg-green-500/20 px-3 py-1.5 rounded">
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="text-md px-2 font-semibold hover:text-red-600"
                >
                  -
                </button>
                <span className="w-5 text-center">
                  {cartItems[product._id]}
                </span>
                <button
                  onClick={() => addToCart(product._id)}
                  className="text-md px-2 font-semibold hover:text-green-800"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
