"use client";
import ArrowDown from "@/assets/shared/ArrowDown";
import IconSuggestion from "@/assets/suggestions/IconSuggestion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "@/app/store/ui-slice";

const SuggestionHeader = () => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const dispatch = useDispatch();

  const toggleFeedbackHandler = () => {
    dispatch(uiActions.toggle())
  };

  const dropdownHandler = () => {
    setDropdown(!dropdown);
  };

  return (
    <form className="w-full bg-darker-navy h-20 rounded-lg flex justify-between items-center text-white px-4 mb-4">
      <div className="flex items-center">
        <i className="mr-4">
          <IconSuggestion />
        </i>
        <h1 className="font-bold mr-4">6 Suggestions</h1>
        <div className="flex">
          <p className="mr-4">Sort by: </p>
          <button type="button" onClick={dropdownHandler} className="flex items-center">Most upvotes <ArrowDown dropdown={dropdown} /></button>
          {dropdown && (
            <ul className="absolute bg-white shadow-lg text-slate rounded-lg mt-16 w-1/5 cursor-pointer">
              <li className="p-4 border-b-2 border-grey">Most Upvotes</li>
              <li className="p-4 border-b-2 border-grey">Least Upvotes</li>
              <li className="p-4 border-b-2 border-grey">Most Comments</li>
              <li className="p-4">Least Comments</li>
            </ul>
          )}
        </div>
      </div>
      <button type="button" className="bg-purple rounded-lg h-12 w-40 hover:" onClick={toggleFeedbackHandler}>+ Add Feedback</button>
    </form>
  );
};

export default SuggestionHeader;
