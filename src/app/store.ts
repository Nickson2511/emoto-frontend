import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import useReducer from '../features/users/userSlice';
import productReducer from '../features/product/productSlice';
import categoryReducer from '../features/category/categorySlice';
import cartReducer from '../features/cart/cartSlice'
import orderReducer from '../features/order/orderSlice'
import wishlistReducer from '../features/wishlist/wishlistSlice'
//import reviewReducer from '../features/review/reviewSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: useReducer,
        product: productReducer,
        category: categoryReducer,
        cart: cartReducer,
        order: orderReducer,
        wishlist: wishlistReducer,
        //review: reviewReducer,
    },
})

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
