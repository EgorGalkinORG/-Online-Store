import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Product } from "../../../shared/types";

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    showSuccessNotification: boolean;
}

const initialState: CartState = {
    items: [],
    isOpen: false,
    showSuccessNotification: false,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        toggleCart: (state) => {
            state.isOpen = !state.isOpen;
        },
        openCart: (state) => {
            state.isOpen = true;
        },
        closeCart: (state) => {
            state.isOpen = false;
        },

        addToCart: (state, action: PayloadAction<Product>) => {
            const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
            
            if (itemIndex >= 0) {
                state.items[itemIndex].count += 1;
            } else {
                state.items.push({ ...action.payload, count: 1 });
            }
            state.showSuccessNotification = true;
        },

        hideNotification: (state) => {
            state.showSuccessNotification = false;
        },

        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },

        incrementCount: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.count += 1;
            }
        },

        decrementCount: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.count > 1) {
                item.count -= 1;
            }
        },

        removeAll: (state) => {
            state.items = [];
        },
    },
});

export const { 
    toggleCart, 
    openCart, 
    closeCart, 
    addToCart, 
    hideNotification,
    removeFromCart, 
    incrementCount, 
    decrementCount, 
    removeAll 
} = cartSlice.actions;

export default cartSlice.reducer;