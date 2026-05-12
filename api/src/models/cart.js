import db from "#configs/database.js";

export async function getActiveCart(userId) {
  const cart = await db("cart")
    .where({ user_id: userId, status: "active" })
    .first();

  if (!cart) return null;

  const items = await db("cart_item")
    .join("event", "cart_item.event_id", "event.id")
    .where({ cart_id: cart.id })
    .select(
      "cart_item.id",
      "cart_item.quantity",
      "cart_item.price_snapshot",
      "event.id as event_id",
      "event.title",
      "event.venue",
      "event.event_date",
      "event.event_time",
    );

  return { ...cart, items };
}
