import express, { Request, Response } from "express";
import Checkout from "../models/Checkout";
import { protect } from "../middleware/authMiddleware";
import Order from "../models/Order";
import Cart from "../models/Cart";

const router = express.Router();

// @route POST /api/checkout/create
// @desc Create a new checkout session
// @access Private

router.post("/create", protect, async (req: Request, res: Response) => {
  try {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!checkoutItems || checkoutItems.length === 0) {
      return res.status(400).json({ message: "No items in checkout" });
    }

    // Create a new checkout session
    const newCheckout = new Checkout({
      user: req.body.user._id,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false
    });

    // await newCheckout.save();
    await Checkout.create(newCheckout);

    console.log(`Checkout created for user: ${req.body.user._id}`);
    res.status(201).json(newCheckout);

  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: "Server error" });
  }
});

// @route PUT /api/checkout/:id/pay
// @desc Update checkout to mark as paid after successful payment
// @access Private

router.put("/:id/pay", protect, async (req: Request, res: Response) => {
  try {
    const { paymentStatus, paymentDetails } = req.body;

    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (paymentStatus === "Paid") {
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.isPaid = true;
      checkout.paidAt = new Date(Date.now());

      await checkout.save();

      res.status(200).json(checkout);
    } else {
      return res.status(400).json({ message: "Invalid payment status" });
    }

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @route POST /api/checkout/:id/finalize
// @desc Finalize checkout and convert to an order after payment confirmation
// @access Private

router.post("/:id/finalize", protect, async (req: Request, res: Response) => {
  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (checkout.isPaid && !checkout.isFinalized) {
      console.log({ checkout })
      // Create final order based on the checkout details
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "Paid",
        paymentDetails: checkout.paymentDetails
      });

      // await Order.create(finalOrder);

      // Mark the checkout as finalized
      checkout.isFinalized = true;
      checkout.finalizedAt = new Date(Date.now());
      await checkout.save();

      // Delete the cart associated with the user
      await Cart.findOneAndDelete({ user: checkout.user });

      return res.status(201).json(finalOrder);
    } else if (checkout.isFinalized) {
      return res.status(400).json({ message: "Checkout is already finalized" });
    } else {
      return res.status(400).json({ message: "Checkout is not paid yet" });
    }
  } catch (error) {
    console.log({ error })
    res.status(500).json({ message: "Server error" });
  }
});

export default router;