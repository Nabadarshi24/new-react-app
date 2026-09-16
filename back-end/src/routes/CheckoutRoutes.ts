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

    // await Cart.findOneAndDelete({ user: req.body.user._id });
    // console.log(`Cart deleted for user: ${req.body.user._id}`);

    res.status(201).json({
      data: newCheckout,
      success: true,
      successMessage: "Checkout created successfully"
    });

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

router.post(
  "/:id/finalize",
  protect,
  async (req: Request, res: Response) => {

    try {

      const checkout = await Checkout.findById(req.params.id);

      if (!checkout) {
        return res.status(404).json({
          message: "Checkout not found"
        });
      }

      if (checkout.isFinalized) {
        return res.status(400).json({
          message: "Checkout is already finalized"
        });
      }

      // ONLINE PAYMENT
      if (
        checkout.paymentMethod === "bkash" ||
        checkout.paymentMethod === "nagad" ||
        checkout.paymentMethod === "online"
      ) {

        if (!checkout.isPaid) {
          return res.status(400).json({
            message:
              "Online payment has not been completed"
          });
        }
      }

      // COD does NOT need isPaid=true
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: checkout.isPaid,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: checkout.isPaid ? "Paid" : "Pending",
        paymentDetails: checkout.paymentDetails
      });

      checkout.isFinalized = true;
      checkout.finalizedAt = new Date();

      await checkout.save();

      // Delete cart ONLY NOW
      await Cart.findOneAndDelete({
        user: checkout.user
      });

      return res.status(201).json({
        success: true,
        successMessage: "Order created successfully",
        data: {
          orderId: finalOrder._id
        }
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        message: "Server error"
      });
    }
  }
);

export default router;