"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { RootState } from "@/app/store/store";
import { uiActions } from "@/app/store/ui-slice";
import { createPortal } from "react-dom";

const EditModal = () => {
  const isModalVisible = useAppSelector(
    (state: RootState) => state.ui.addFeedbackIsVisible
  );
  const dispatch = useAppDispatch();
  return (
    isModalVisible &&
    createPortal(
      <>
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={() => dispatch(uiActions.toggle())}
        ></div>
        <div className="fixed z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5/6 w-7/12">
          <div className="bg-white rounded-lg px-12 pt-12 pb-4 h-full">
            <form>
              <h1 className="text-4xl mb-4 text-darker-navy">
                Editing 'insert title here'
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
                  defaultValue={"Insert the value of the current post"}
                />
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
                  defaultValue={"INSERT CORRECT VALUE"}
                >
                  <option value="feature">Feature</option>
                  <option value="enhancement">Enhancement</option>
                  <option value="bug">Bug</option>
                  <option value="ui">UI</option>
                </select>
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-slate mb-2">Update Status</p>
                <label htmlFor="detail" className="mb-2">
                  Change feature state
                </label>
                <select
                  name="options"
                  id="options"
                  className="p-4 bg-off-white rounded-lg mb-4"
                  required
                  defaultValue={"INSERT CORRECT VALUE"}
                >
                  <option value="planned">Suggestion</option>
                  <option value="feature">Planned</option>
                  <option value="enhancement">In-Progress</option>
                  <option value="ui">Live</option>
                </select>
              </div>
              <div className="flex justify-between gap-4 mt-2">
                <button className="bg-red-500 text-white py-2 px-4 rounded-lg">Delete</button>
                <div>
                  <button className="bg-darker-navy text-white py-2 px-4 rounded-lg">
                    Cancel
                  </button>
                  <button className="bg-purple text-white py-2 px-4 rounded-lg ml-2">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>,
      document.body
    )
  );
};

export default EditModal;
