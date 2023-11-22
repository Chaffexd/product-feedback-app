import { Feedback } from "@/components/Models/models";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type FilterState = {
    selectedFilter: string;
    selectedCategory: string;
    filteredFeedback: Feedback[]
}

const initialState: FilterState = {
    selectedFilter: 'Most Upvotes',
    selectedCategory: 'All',
    filteredFeedback: []
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.selectedFilter = action.payload
        },
        setCategory: (state, action) => {
            state.selectedCategory = action.payload
        },
        // this holds the filtered data so I can track the suggestions in the SuggestionsHeader
        updateFilteredFeedback: (state, action: PayloadAction<Feedback[]>) => {
            state.filteredFeedback = action.payload
        }
    }
});

export const filterActions = filterSlice.actions;
export default filterSlice;