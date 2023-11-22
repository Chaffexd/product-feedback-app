import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        selectedFilter: 'Most Upvotes', // initial filter
        selectedCategory: 'All', // initial category
    },
    reducers: {
        setFilter: (state, action) => {
            state.selectedFilter = action.payload
        },
        setCategory: (state, action) => {
            state.selectedCategory = action.payload
        }
    }
});

export const filterActions = filterSlice.actions;
export default filterSlice;