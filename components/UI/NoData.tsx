import { useAppDispatch } from "@/app/store/hooks";
import { uiActions } from "@/app/store/ui-slice";
import Illustration from "@/assets/suggestions/Illustration";
import React from "react";

const NoData = () => {
  const dispatch = useAppDispatch();

  const toggleFeedbackHandler = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <section className="w-full bg-white rounded-lg h-96 flex justify-center p-8">
      <div className="flex flex-col items-center">
        <Illustration />
        <h1 className="font-bold py-8">There is no feedback yet.</h1>
        <p>Got a suggestion? Found a bug that needs to be improved?</p>
        <p>We love hearing about new ideas to improve our app.</p>
        <button
          type="button"
          className="bg-purple rounded-lg h-12 w-40 text-white mt-4"
          onClick={toggleFeedbackHandler}
        >
          + Add Feedback
        </button>
      </div>
    </section>
  );
};

export default NoData;
