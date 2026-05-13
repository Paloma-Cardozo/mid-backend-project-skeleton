import db from "#configs/database.js";

export async function createOrder(userId, totalAmount, trx) {
  const [order] = await trx("customer_order")
    .insert({ user_id: userId, total_amount: totalAmount })
    .returning("*");
  return order;
}

export async function createOrderItems(orderId, cartItems, trx) {
  const items = cartItems.map((item) => ({
    order_id: orderId,
    event_id: item.event_id,
    quantity: item.quantity,
    price_snapshot: item.price_snapshot,
  }));

  const orderItems = await trx("order_item").insert(items).returning("*");
  return orderItems;
}

export async function getOrdersByUser(userId) {
  const orders = await db("customer_order")
    .where({ user_id: userId })
    .orderBy("created_at", "desc");

  return orders;
}

export async function getOrderById(orderId) {
  const order = await db("customer_order").where({ id: orderId }).first();

  if (!order) {
    return null;
  }

  const items = await db("order_item")
    .join("event", "order_item.event_id", "event.id")
    .where({ order_id: orderId })
    .select(
      "order_item.id",
      "order_item.quantity",
      "order_item.price_snapshot",
      "event.id as event_id",
      "event.title",
      "event.venue",
      "event.event_date",
      "event.event_time",
    );

  return { ...order, items };
}
