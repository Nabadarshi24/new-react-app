import express, { Request, Response } from "express";
import Cart from "../models/Cart";
import Product from "../models/Products";
import { admin, protect } from "../middleware/authMiddleware";

const cartRouter = express.Router();

// Helper funcotion to get a cart by userId or guestId
const getCart = async (userId: string, guestId: string) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }

  return null;
}

// @route POST /api/cart/create
// @desc Add a product to the cart for a guest or logged in user
// @access Public

cartRouter.post("/create", async (req: Request, res: Response) => {
  try {
    const { productId, size, color, quantity, guestId, userId } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the user is logged in or guest
    let cart = await getCart(userId, guestId);

    // If the cart exist, update it
    if (cart) {
      const productIndex = cart.products.findIndex((item) =>
        item.productId.toString() === productId &&
        item.size === size &&
        item.color === color
      );

      // check if the product altready exists
      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({
          productId,
          name: product.productName,
          image: product.images[0].url,
          color,
          size,
          quantity,
          price: product.price,
        })
      }

      cart.totalPrice = cart.products.reduce((total, item) => total + (item.price * item.quantity), 0);
      await cart.save();
      return res.status(200).json(cart);
    } else {
      // create a new cart for guest or user
      const newCart = await Cart.create({
        userId: userId ? userId : null,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.productName,
            image: product.images[0].url,
            color,
            size,
            quantity,
            price: product.price
          }
        ],
        totalPrice: product.price * quantity
      });

    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
