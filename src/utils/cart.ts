export const getCart = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart: any[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));

  // notify header to update cart counter instantly
  window.dispatchEvent(new Event("cartUpdated"));
};

export const addToCart = (item: any) => {
  const cart = getCart();

  const newItem = {
    ...item,
    id: Date.now() // unique id so multiple same packages work correctly
  };

  cart.push(newItem);

  saveCart(cart);
};

export const removeFromCart = (id: number) => {
  const cart = getCart().filter((item: any) => item.id !== id);

  saveCart(cart);
};

export const clearCart = () => {
  localStorage.removeItem("cart");

  // update cart counter
  window.dispatchEvent(new Event("cartUpdated"));
};
