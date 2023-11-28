"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { RootState } from "@/app/store/store";
import { uiActions } from "@/app/store/ui-slice";
import { createPortal } from "react-dom";
import { useRef, useState } from "react";
import { feedbackActions } from "@/app/store/feedback-slice";
import { useRouter } from "next/navigation";
import { Feedback } from "../Models/models";

type EditModalProps = {
  feedbackId: number;
};

const EditModal = ({ feedbackId }: EditModalProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isModalVisible = useAppSelector(
    (state: RootState) => state.ui.addFeedbackIsVisible
  );
  const allPosts = useAppSelector((state) => state.feedback.feedback);

  // - 1 because of difference in index in DB and store

  // const currentPostDetail = allPosts[feedbackId - 1];
  // console.log("currentPostDetail=========", currentPostDetail)
  const currentPostDetail = allPosts.find(
    (post) => Number(post.id) === Number(feedbackId)
  );
  // console.log("currentPostDetail=========", currentPostDetails)
  // console.log("TITLE", currentPostDetails?.title, 'CATEGORY', currentPostDetails?.category, 'STATUS', currentPostDetails?.status)

  const { title, category, status } = currentPostDetail || {} as Feedback;

  const titleRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);

  const handleSavedChanges = () => {
    const updatedPost = {
      currentPostDetail: currentPostDetail,
      title: titleRef.current?.value,
      category: categoryRef.current?.value,
      status: statusRef.current?.value,
    };
    // give the new data to redux
    dispatch(feedbackActions.updatePost(updatedPost));

    dispatch(uiActions.toggle());
  };

  return (
    isModalVisible &&
    createPortal(
      <>
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={() => dispatch(uiActions.toggle())}
        ></div>
        <div className="fixed z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5/6 w-7/12">
          <div className="bg-white rounded-lg px-12 pt-12 pb-4 h-full overflow-scroll">
            <form name="edit-form">
              <h1 className="text-4xl mb-4 text-darker-navy">
                Editing '{title}'
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
                  defaultValue={title}
                  ref={titleRef}
                />
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-slate mb-2">Category</p>
                <label htmlFor="category" className="mb-4">
                  Choose a category for your feedback
                </label>
                <select
                  name="category"
                  id="category"
                  className="p-4 bg-off-white rounded-lg mb-4"
                  required
                  defaultValue={category}
                  ref={categoryRef}
                >
                  <option value="feature">Feature</option>
                  <option value="enhancement">Enhancement</option>
                  <option value="bug">Bug</option>
                  <option value="ui">UI</option>
                </select>
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-slate mb-2">Update Status</p>
                <label htmlFor="progress" className="mb-2">
                  Change feature state
                </label>
                <select
                  name="progress"
                  id="progress"
                  className="p-4 bg-off-white rounded-lg mb-4"
                  required
                  defaultValue={status}
                  ref={statusRef}
                >
                  <option value="suggestion">Suggestion</option>
                  <option value="planned">Planned</option>
                  <option value="in-progress">In-Progress</option>
                  <option value="live">Live</option>
                </select>
              </div>
              <div className="flex justify-between gap-4 mt-4">
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-lg"
                  onClick={() => {
                    try {
                      router.push("/");
                      dispatch(
                        feedbackActions.deletePost({ feedbackId, allPosts })
                      );
                      setIsDeleting(true);
                    } catch (error) {
                      console.error("Error deleting post", error);
                    } finally {
                      console.log("Deleted!");
                      dispatch(uiActions.toggle());
                    }
                  }}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
                <div>
                  <button
                    className="bg-darker-navy text-white py-3 px-4 rounded-lg"
                    onClick={() => dispatch(uiActions.toggle())}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-purple text-white py-3 px-4 rounded-lg ml-2"
                    onClick={handleSavedChanges}
                    role="button"
                    type="button"
                  >
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
