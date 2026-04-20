import express, { Request, Response } from "express";
import Cart from "../models/Cart";
import { admin, protect } from "../middleware/authMiddleware";
import Product from "../models/Products";

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

const getCartById = async (id: string) => {
  let userId, guestId;

  if (id.startsWith("guest")) {
    guestId = id;
  } else {
    userId = id;
  }

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
        // If the product already exists, update the quantity
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
        user: userId ? userId : null,
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

      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route PUT /api/cart/edit
// @desc Update product quantity in the cart for a guest or logged in user
// @access Public

cartRouter.put("/edit", async (req: Request, res: Response) => {
  console.log({ req })
  try {
    const { quantity, productId, size, color, guestId, userId } = req.body;
    console.log({ productId })

    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = cart.products.findIndex(product =>
      product.productId.toString() === productId &&
      product.size === size &&
      product.color === color
    );

    if (productIndex > -1) {
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1); // Remove product if quantity is 0
      }
      cart.totalPrice = cart.products.reduce((total, item) => total + (item.price * item.quantity), 0);

      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route PUT /api/cart/delete
// @desc Delete a product from the cart
// @access Public

cartRouter.delete("/delete", async (req: Request, res: Response) => {
  const { productId, guestId, userId, size, color } = req.body;

  let cart = await getCart(userId, guestId);

  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const productIndex = cart.products.findIndex(product =>
    product.productId.toString() === productId &&
    product.size === size &&
    product.color === color
  );

  if (productIndex > -1) {
    cart.products.splice(productIndex, 1);
    cart.totalPrice = cart.products.reduce((total, item) => total + (item.price * item.quantity), 0);

    await cart.save();
    return res.status(200).json(cart);
  } else {
    return res.status(404).json({ message: "Product not found in cart" });
  }
});

// @route GET /api/cart/list
// @desc GET logged-in or guest user's cart
// @access Public

cartRouter.get("/list", async (req: Request, res: Response) => {
  try {
    const { userId, guestId } = req.query;

    const cart = await getCart(userId as string, guestId as string,);

    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" })
  }
});

cartRouter.get("/list/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const cart = await getCartById(id);

    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" })
  }
});

// @route POST /api/cart/merge
// @desc merge guest cart into user cart on login
// @access Private

cartRouter.post("/merge", protect, async (req: Request, res: Response) => {
  try {
    const { guestId } = req.body;

    // Find guest or user cart
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.body.user._id });

    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(400).json({ message: "Guest cart is empty" })
      }

      if (userCart) {
        // Merge guest cart into user cart
        guestCart.products.forEach(guestItem => {
          const productIndex = userCart.products.findIndex(userItem =>
            userItem.productId.toString() === guestItem.productId.toString() &&
            userItem.size === guestItem.size &&
            userItem.color === guestItem.color
          )

          // If the item exist in the user cart, update the quantity
          if (productIndex >= 0) {
            userCart.products[productIndex].quantity = guestItem.quantity;
          } else {
            userCart.products.push(guestItem);
          }
        });

        userCart.totalPrice = userCart.products.reduce((total, item) => total + (item.price * item.quantity), 0);

        await userCart.save();

        // Remove the guest cart after merging
        try {
          await Cart.findOneAndDelete({ guestId });
        } catch (error) {
          console.error("Error deleting guest cart:", error)
        }

        res.status(200).json(userCart);
      } else {
        // If the user has no existing cart, assign the guest cart to the user
        guestCart.user = req.body.user._id;
        guestCart.guestId = "";

        await guestCart.save();
        res.status(200).json(guestCart);
      }
    } else {
      // Guest cart has already been merged, return user cart
      if (userCart) return res.status(200).json(userCart)

      res.status(404).json({ message: "Guest cart not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default cartRouter;
