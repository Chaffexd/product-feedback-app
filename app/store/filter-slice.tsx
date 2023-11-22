import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        selectedFilter: 'Most Upvotes', // initial filter
    },
    reducers: {
        setFilter: (state, action) => {
            state.selectedFilter = action.payload
        },
    }
});

export const filterActions = filterSlice.actions;
export default filterSlice;