import { CartItem } from "../types";

export function addToCart(item: CartItem) {
  // Fetch current cart from localStorage
  const currentCart = JSON.parse(
    localStorage.getItem("cart") || "[]"
  ) as CartItem[];

  // Check if item already exists in the cart
  const existingItemIndex = currentCart.findIndex(
    (cartItem) => cartItem.id === item.id
  );

  if (existingItemIndex > -1) {
    // Update quantity if item already exists
    currentCart[existingItemIndex].quantity += item.quantity;
  } else {
    // Add new item to the cart
    currentCart.push(item);
  }

  // Save updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(currentCart));
}

export function getCartItems() {
  return JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[];
}

export function calculateTotal(cartItems: CartItem[]) {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

export function clearCart() {
  localStorage.removeItem("cart");
}


export const getCartItemCount = (): number => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  return cart.length;
};
