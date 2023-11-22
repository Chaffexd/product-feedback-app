import Link from "next/link";
import ArrowUp from "@/assets/shared/ArrowUp";
import Comments from "@/assets/shared/Comments";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { Feedback } from "../Models/models";
import { filterActions } from "@/app/store/filter-slice";
import { useEffect } from "react";
import NoData from "../UI/NoData";

const Suggestion = () => {
  const dispatch = useAppDispatch();
  const allFeedback = useAppSelector((state) => state.feedback.feedback);
  const selectedFilter = useAppSelector((state) => state.filter.selectedFilter);
  const selectedCategory = useAppSelector(
    (state) => state.category.selectedCategory
  );
  let sortedData = [...allFeedback];

  switch (selectedFilter) {
    case "Most Upvotes":
      // sort data by most upvotes
      sortedData.sort((a, b) => b.upvotes - a.upvotes);
      break;
    case "Least Upvotes":
      // sort by least upvotes
      sortedData.sort((a, b) => a.upvotes - b.upvotes);
      break;
    case "Most Comments":
      // sort by most comments
      sortedData.sort(
        (a, b) => (b.comments?.length || 0) - (a.comments?.length || 0) // 0 as a fallback, there may be no comments
      );
      break;
    case "Least Comments":
      // sort by least comments
      sortedData.sort(
        (a, b) => (a.comments?.length || 0) - (b.comments?.length || 0) // 0 as a fallback, there may be no comments
      );
      break;
    default:
      // return most upvotes as default
      sortedData.sort((a, b) => b.upvotes - a.upvotes);
  }

  if (selectedCategory !== "All") {
    sortedData = sortedData.filter(
      (data) => data.category === selectedCategory.toLowerCase()
    ); //TLC because button has a capital letter
  }

  useEffect(() => {
    dispatch(filterActions.setCategory(selectedCategory));
    dispatch(filterActions.setFilter(selectedFilter));
    dispatch(filterActions.updateFilteredFeedback(sortedData));
  }, [dispatch, selectedCategory, selectedFilter, sortedData]);

  return (
    <>
      {allFeedback.length > 0
        ? sortedData.map((feedback: Feedback) => (
            <Link
              href={`${feedback.category}/` + feedback.id}
              key={feedback.id}
            >
              <article className="w-full bg-off-white shadow-md p-4 rounded-lg mb-4 flex justify-between items-center">
                <div className="flex">
                  <div className="mr-8 flex justify-center w-12">
                    <span className="bg-grey p-2 h-14 rounded-lg flex flex-col items-center">
                      <ArrowUp />
                      <span className="mt-2">{feedback.upvotes}</span>
                    </span>
                  </div>
                  <div>
                    <h1 className="font-bold text-slate mb-4">
                      {feedback.title}
                    </h1>
                    <p className="font-md text-slate mb-2">
                      {feedback.description}
                    </p>
                    <button className="p-2 bg-grey rounded-lg py-2 px-4 text-blue h-10 w-auto mr-4 text-center font-normal">
                      {feedback.category}
                    </button>
                  </div>
                </div>
                <div className="flex items-center">
                  <i>
                    <Comments />
                  </i>
                  <p className="pl-2">{feedback.comments?.length}</p>
                </div>
              </article>
            </Link>
          ))
        : <NoData />}
    </>
  );
};

export default Suggestion;
