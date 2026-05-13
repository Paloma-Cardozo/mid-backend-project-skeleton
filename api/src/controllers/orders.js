import db from "#configs/database.js";
import { getActiveCart, completeCart } from "#models/cart.js";
import {
  createOrder,
  createOrderItems,
  getOrdersByUser,
  getOrderById,
} from "#models/orders.js";

export async function checkout(req, res, next) {
  try {
    let userId = null;

    if (req.user) {
      userId = req.user.user_id;
    }

    const cart = await getActiveCart(userId);

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        error: "Cart is empty",
        status: 400,
      });
    }

    const total = cart.items.reduce((sum, item) => {
      return sum + item.quantity * parseFloat(item.price_snapshot);
    }, 0);

    const order = await db.transaction(async (trx) => {
      const newOrder = await createOrder(userId, total.toFixed(2), trx);
      await createOrderItems(newOrder.id, cart.items, trx);
      await completeCart(cart.id, trx);
      return newOrder;
    });

    const orderWithItems = await getOrderById(order.id);

    return res.status(201).json({
      data: {
        id: orderWithItems.id,
        status: orderWithItems.status,
        items: orderWithItems.items,
        total: total.toFixed(2),
        created_at: orderWithItems.created_at,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function listOrders(req, res, next) {
  try {
    let userId = null;

    if (req.user) {
      userId = req.user.user_id;
    }

    const orders = await getOrdersByUser(userId);

    return res.status(200).json({
      data: orders,
    });
  } catch (error) {
    next(error);
  }
}

export async function getOrder(req, res, next) {
  try {
    let userId = null;

    if (req.user) {
      userId = req.user.user_id;
    }

    const orderId = req.params.orderId;
    const order = await getOrderById(orderId);

    if (!order) {
      return res.status(404).json({
        error: "Order not found",
        status: 404,
      });
    }

    if (order.user_id !== userId) {
      return res.status(403).json({
        error: "This order does not belong to you",
        status: 403,
      });
    }

    const total = order.items.reduce((sum, item) => {
      return sum + item.quantity * parseFloat(item.price_snapshot);
    }, 0);

    return res.status(200).json({
      data: {
        id: order.id,
        user_id: order.user_id,
        total: total.toFixed(2),
        created_at: order.created_at,
        items: order.items,
      },
    });
  } catch (error) {
    next(error);
  }
}
