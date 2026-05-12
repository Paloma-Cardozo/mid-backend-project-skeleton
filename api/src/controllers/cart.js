import { getActiveCart } from "#models/cart.js";

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
