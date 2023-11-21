import { RootState } from "@/app/store";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "@/app/store/ui-slice";
import { createPortal } from "react-dom";
import { useRef, useState } from "react";
import { feedbackActions } from "@/app/store/feedback-slice";

const Modal = () => {
  const dispatch = useDispatch();
  const titleRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const isModalVisible = useSelector(
    (state: RootState) => state.ui.addFeedbackIsVisible
  );

  const toggleFeedbackHandler = () => {
    dispatch(uiActions.toggle());
  };

  const formSubmissionHandler = async(event: React.FormEvent) => {
    event.preventDefault();

    const submissionData = {
      title: titleRef.current?.value.trim(),
      category: categoryRef.current?.value.trim(),
      description: descriptionRef.current?.value.trim(),
    };

    if (submissionData.title === '' || submissionData.description === '') {
        console.error("Form is invalid.");
        setErrorMessage("Please fill in the required fields.");
        return;
    }

    // update redux state
    dispatch(feedbackActions.setFeedbackData(submissionData));

    // once submitted, clear the form and close the window
    toggleFeedbackHandler();
  };

  return (
    isModalVisible &&
    createPortal(
      <>
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={toggleFeedbackHandler}
        ></div>
        <div className="fixed z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5/6 w-7/12">
          <div className="bg-white rounded-lg px-12 pt-12 pb-4 h-full">
            <form onSubmit={formSubmissionHandler}>
              <h1 className="text-4xl mb-4 text-darker-navy">
                Create New Feedback
              </h1>
              <div className="flex flex-col w-full">
                <p className="font-bold text-slate mb-2">Feedback Title</p>
                <label htmlFor="title" className="mb-4">
                  Add a short, descriptive headline
                </label>
                <input
                  type="text"
                  id="title"
                  className="p-4 bg-off-white rounded-lg mb-4"
                  required
                  ref={titleRef}
                />
                {errorMessage && <span className="text-red-600 -mt-4 text-sm">{errorMessage}</span>}
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-slate mb-2">Category</p>
                <label htmlFor="options" className="mb-4">
                  Choose a category for your feedback
                </label>
                <select
                  name="options"
                  id="options"
                  className="p-4 bg-off-white rounded-lg mb-4"
                  required
                  ref={categoryRef}
                >
                  <option value="feature">Feature</option>
                  <option value="enhancement">Enhancement</option>
                  <option value="ui">UI</option>
                  <option value="bug">Bug</option>
                  <option value="feature">Feature</option>
                </select>
              </div>
              <div>
                <p className="font-bold text-slate mb-2">Feedback Detail</p>
                <label htmlFor="detail">
                  Include any specific comments on what should be improved,
                  added, etc.
                </label>
                <textarea
                  id="detail"
                  className="p-4 bg-off-white rounded-lg w-full"
                  required
                  ref={descriptionRef}
                />
                {errorMessage && <span className="text-red-600 text-sm">{errorMessage}</span>}
              </div>
            </form>
            <div className="flex justify-end gap-4 mt-2">
              <button
                onClick={toggleFeedbackHandler}
                className="bg-darker-navy text-white py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={formSubmissionHandler}
                className="bg-purple text-white py-2 px-4 rounded-lg"
              >
                Add Feedback
              </button>
            </div>
          </div>
        </div>
      </>,
      document.body
    )
  );
};

export default Modal;
