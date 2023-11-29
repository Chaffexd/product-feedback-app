"use client";
import ArrowDown from "@/assets/shared/ArrowDown";
import IconSuggestion from "@/assets/suggestions/IconSuggestion";
import { useState } from "react";
import { uiActions } from "@/app/store/ui-slice";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { filterActions } from "@/app/store/filter-slice";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SuggestionHeader = () => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const selectedFilter = useAppSelector((state) => state.filter.selectedFilter);
  const feedback = useAppSelector(
    (state) => state.filter.filteredFeedback.length
  ); // length of objects in selected filter
  const dispatch = useAppDispatch();
  const router = useRouter();

  const toggleFeedbackHandler = () => {
    dispatch(uiActions.toggle());
  };

  const dropdownHandler = () => {
    setDropdown(!dropdown);
  };

  const selectFilterHandler = (filter: string) => {
    dispatch(filterActions.setFilter(filter)); // Updates the filter selection
    setDropdown(false); // Close the dropdown when an item is clicked
  };

  const { data: session, status } = useSession();
  console.log("STATUS LOG IN", session, status);

  return (
    <form className="w-full bg-darker-navy h-20 rounded-lg flex justify-between items-center text-white px-4 mb-4">
      <div className="flex items-center">
        <i className="mr-4">
          <IconSuggestion />
        </i>
        <h1 className="font-bold mr-4">
          {feedback} {feedback === 1 ? "Suggestion" : "Suggestions"}
        </h1>
        <div className="flex">
          <p className="mr-4">Sort by: </p>
          <div className="flex items-center">
            <button
              type="button"
              onClick={dropdownHandler}
              className="flex items-center mr-2"
            >
              {selectedFilter}
            </button>
            <ArrowDown dropdown={dropdown} />
          </div>
          {dropdown && (
            <ul className="absolute bg-white shadow-lg text-slate rounded-lg mt-16 w-1/5 cursor-pointer">
              <li
                className="p-4 border-b-2 border-grey"
                onClick={() => selectFilterHandler("Most Upvotes")}
              >
                Most Upvotes{" "}
                <span>{selectedFilter === "Most Upvotes" && "✔"}</span>
              </li>
              <li
                className="p-4 border-b-2 border-grey"
                onClick={() => selectFilterHandler("Least Upvotes")}
              >
                Least Upvotes{" "}
                <span>{selectedFilter === "Least Upvotes" && "✔"}</span>
              </li>
              <li
                className="p-4 border-b-2 border-grey"
                onClick={() => selectFilterHandler("Most Comments")}
              >
                Most Comments{" "}
                <span>{selectedFilter === "Most Comments" && "✔"}</span>
              </li>
              <li
                className="p-4"
                onClick={() => selectFilterHandler("Least Comments")}
              >
                Least Comments{" "}
                <span>{selectedFilter === "Least Comments" && "✔"}</span>
              </li>
            </ul>
          )}
        </div>
      </div>
      {status === "authenticated" ? (
        <div>
          <button
            onClick={() => router.push("/api/auth/signout")}
            className="bg-purple rounded-lg h-12 w-24 mr-4"
          >
            Sign Out
          </button>
          <button
            type="button"
            className="bg-purple rounded-lg h-12 w-40 hover:"
            onClick={toggleFeedbackHandler}
          >
            + Add Feedback
          </button>
        </div>
      ) : status === "loading" || status === "unauthenticated" ? (
        <button
          className="bg-purple rounded-lg h-12 w-40"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      ) : null}
    </form>
  );
};

export default SuggestionHeader;
