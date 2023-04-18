export const host = "http://localhost:3001";

export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const getUserRoute = `${host}/api/auth/getuser`;
export const addReviewRoute = `${host}/api/auth/addreview`;
export const updatePfpRoute = `${host}/api/auth/updatepfp`;

export const addItemRoute = `${host}/api/item/additem`;
export const getItemsRoute = `${host}/api/item/getitems`;
export const removeItemRoute = `${host}/api/item/removeitem`;

export const getCartItemsRoute = `${host}/api/cart/getcartitems`;
export const addCartItemRoute = `${host}/api/cart/addcartitem`;
export const removeCartItemRoute = `${host}/api/cart/removecartitem`;

export const checkoutRoute = `${host}/api/checkout/create-checkout-session`;