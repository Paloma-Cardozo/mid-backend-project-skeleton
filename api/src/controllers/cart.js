import { getActiveCart, createCart, addItemToCart } from "#models/cart.js";
import db from "#configs/database.js";

export async function getCart(req, res, next) {
  try {
    const userId = req.user ? req.user.user_id : null;

    const cart = await getActiveCart(userId);

    if (!cart) {
      return res.status(200).json({
        data: {
          items: [],
          subtotal: 0,
        },
      });
    }

    const subtotal = cart.items.reduce((sum, item) => {
      return sum + item.quantity * parseFloat(item.price_snapshot);
    }, 0);

    return res.status(200).json({
      data: {
        id: cart.id,
        status: cart.status,
        items: cart.items,
        subtotal: subtotal.toFixed(2),
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function addItem(req, res, next) {
  try {
    const userId = req.user ? req.user.user_id : null;
    const { event_id, quantity } = req.body;

    if (!event_id || quantity === undefined || quantity === null) {
      return res.status(400).json({
        error: "event_id and quantity are required",
        status: 400,
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        error: "Quantity must be at least 1",
        status: 400,
      });
    }

    const event = await db("event").where({ id: event_id }).first();
    if (!event) {
      return res.status(404).json({
        error: "Event not found",
        status: 404,
      });
    }

    let cart = await getActiveCart(userId);
    if (!cart) {
      cart = await createCart(userId);
    }

    await addItemToCart(cart.id, event_id, quantity, event.price);

    const updatedCart = await getActiveCart(userId);

    const subtotal = updatedCart.items.reduce((sum, item) => {
      return sum + item.quantity * parseFloat(item.price_snapshot);
    }, 0);

    return res.status(201).json({
      data: {
        id: updatedCart.id,
        status: updatedCart.status,
        items: updatedCart.items,
        subtotal: subtotal.toFixed(2),
      },
    });
  } catch (error) {
    next(error);
  }
}
