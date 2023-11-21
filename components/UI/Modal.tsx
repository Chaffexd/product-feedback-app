import { RootState } from "@/app/store";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "@/app/store/ui-slice";

const Modal = () => {
  const dispatch = useDispatch();

  const isModalVisible = useSelector(
    (state: RootState) => state.ui.addFeedbackIsVisible
  );

  const toggleFeedbackHandler = () => {
    dispatch(uiActions.toggle());
  };

  return (
    isModalVisible && (
      <>
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={toggleFeedbackHandler}
        ></div>
        <div className="fixed z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5/6 w-7/12">
          <div className="bg-white rounded-lg p-12 h-full">
            <form>
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
                />
              </div>
            </form>
            <div className="flex justify-end gap-4">
              <button onClick={toggleFeedbackHandler} className="bg-darker-navy text-white py-2 px-4 rounded-lg">Cancel</button>
              <button onClick={toggleFeedbackHandler} className="bg-purple text-white py-2 px-4 rounded-lg">Add Feedback</button>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Modal;
