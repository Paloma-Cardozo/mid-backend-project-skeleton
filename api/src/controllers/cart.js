import {
  getActiveCart,
  createCart,
  addItemToCart,
  findCartItem,
  updateCartItem,
  deleteCartItem,
} from "#models/cart.js";
import db from "#configs/database.js";

export async function getCart(req, res, next) {
  try {
    let userId = null;

    if (req.user) {
      userId = req.user.user_id;
    }

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
    let userId = null;

    if (req.user) {
      userId = req.user.user_id;
    }

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

export async function updateItem(req, res, next) {
  try {
    let userId = null;
    if (req.user) {
      userId = req.user.user_id;
    }

    const itemId = req.params.itemId;
    const { quantity } = req.body;

    if (quantity === undefined || quantity === null) {
      return res.status(400).json({
        error: "Quantity is required",
        status: 400,
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        error: "Quantity must be at least 1",
        status: 400,
      });
    }

    const cartItem = await findCartItem(itemId);
    if (!cartItem) {
      return res.status(404).json({
        error: "Cart item not found",
        status: 404,
      });
    }

    const cart = await getActiveCart(userId);
    if (!cart || cart.id !== cartItem.cart_id) {
      return res.status(403).json({
        error: "This item does not belong to your cart",
        status: 403,
      });
    }

    await updateCartItem(itemId, quantity);

    const updatedCart = await getActiveCart(userId);

    const subtotal = updatedCart.items.reduce((sum, item) => {
      return sum + item.quantity * parseFloat(item.price_snapshot);
    }, 0);

    return res.status(200).json({
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

export async function removeItem(req, res, next) {
  try {
    let userId = null;

    if (req.user) {
      userId = req.user.user_id;
    }

    const itemId = req.params.itemId;

    const cartItem = await findCartItem(itemId);

    if (!cartItem) {
      return res.status(404).json({
        error: "Cart item not found",
        status: 404,
      });
    }

    const cart = await getActiveCart(userId);

    if (!cart || cart.id !== cartItem.cart_id) {
      return res.status(403).json({
        error: "This item does not belong to your cart",
        status: 403,
      });
    }

    await deleteCartItem(itemId);

    const updatedCart = await getActiveCart(userId);

    let subtotal = 0;
    let items = [];

    if (updatedCart) {
      items = updatedCart.items;
      subtotal = updatedCart.items.reduce((sum, item) => {
        return sum + item.quantity * parseFloat(item.price_snapshot);
      }, 0);
    }

    return res.status(200).json({
      data: {
        id: cart.id,
        status: cart.status,
        items,
        subtotal: subtotal.toFixed(2),
      },
    });
  } catch (error) {
    next(error);
  }
}
