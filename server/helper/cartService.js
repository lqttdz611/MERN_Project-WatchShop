const CartOrder = require('../models/fakeCart'); // Import the Cart model

/**
 * Save cart data to the database.
 * @param {Object} cartData - The cart data to save.
 * @param {String} userId - The user ID associated with the cart.
 * @returns {Promise<String>} - Returns the unique cart ID.
 */
const saveCartData = async (cartData, userId) => {
  try {
    const cart = new CartOrder({
      userId,
      cartItems: cartData,
    });

    const savedCart = await cart.save();
    return savedCart._id.toString(); // Return the unique cart ID
  } catch (error) {
    console.error('Error saving cart data:', error);
    throw new Error('Could not save cart data');
  }
};

module.exports = { saveCartData };
