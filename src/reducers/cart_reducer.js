import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const tempCart = addToCart(action.payload, state);
    return { ...state, cart: tempCart };
  }
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = remove(action.payload, state.cart);
    return { ...state, cart: tempCart };
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    let amount = 0;
    let tempCart = state.cart.map((item) => {
      if (item.id === action.payload.id) {
        amount = item.amount + action.payload.amt;
        if (amount > item.max) {
          amount = item.max;
        }
        item = { ...item, amount: amount };
      }
      return item;
    });
    if (amount === 0) {
      tempCart = remove(action.payload.id, tempCart);
    }
    return { ...state, cart: tempCart };
  }

  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  if (action.type === COUNT_CART_TOTALS) {
    var total_cost = 0;
    var total_items = 0;
    state.cart.forEach((element) => {
      total_cost = total_cost + element.amount * element.price;
      total_items = total_items + element.amount;
    });
    return { ...state, total_amount: total_cost, total_items: total_items };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

const remove = (id, cart) => {
  return cart.filter((item) => item.id !== id);
};

const addToCart = (item, state) => {
  const { id, color, amount, product } = item;
  const tempItem = state.cart.find((i) => i.id === id + color);
  if (tempItem) {
    const tempCart = state.cart.map((cartItem) => {
      if (id + color === cartItem.id) {
        const newAmount = cartItem.amount + amount;
        if (newAmount <= cartItem.max) {
          cartItem = { ...cartItem, amount: newAmount };
        } else {
          cartItem = { ...cartItem, amount: cartItem.max };
        }
      }
      return cartItem;
    });

    return tempCart;
  } else {
    const newItem = {
      id: id + color,
      name: product.name,
      color,
      amount,
      image: product.images[0].url,
      price: product.price,
      max: product.stock,
    };
    return [...state.cart, newItem];
  }
};

export default cart_reducer;
