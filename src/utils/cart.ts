
export const getCart = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart: any[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCart = (item: any) => {
  const cart = getCart();
  cart.push(item);
  saveCart(cart);
};

export const removeFromCart = (slug: string) => {
  const cart = getCart().filter((item: any) => item.slug !== slug);
  saveCart(cart);
};

export const clearCart = () => {
  localStorage.removeItem("cart");
};
