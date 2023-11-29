import Image from "next/image";
import { Feedback } from "../Models/models";
import FeedbackCommentReply from "./FeedbackCommentReply";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { RootState } from "@/app/store/store";
import { uiActions } from "@/app/store/ui-slice";
import { feedbackActions } from "@/app/store/feedback-slice";
import { useEffect, useRef } from "react";
import DefaultAvatar from "../../assets/default-avatar.jpeg";
import { useSession } from "next-auth/react";

type CommentsProps = {
  comments: Feedback[];
};

const FeedbackItemComments = ({ comments }: CommentsProps) => {
  const currentState = useAppSelector((state) => state.feedback.feedback);
  const feedbackData = useAppSelector((state) => state.feedback);
  const isInitialPageLoad = useAppSelector(
    (state) => state.ui.isInitialPageLoad
  );
  console.log("IN THIS THE INITIAL PAGE LOAD", isInitialPageLoad)
  const dispatch = useAppDispatch();
  const newCommentRef = useRef<HTMLTextAreaElement>(null);

  // console.log(initialPostUser); // ["hexagon.bestagon", "hummingbird1"]
  // check in the array if it includes the users name
  const isReplying = useAppSelector(
    (state: RootState) => state.ui.replyingUsername
  );

  useEffect(() => {
    if (isInitialPageLoad || feedbackData.changed) {
      console.log(feedbackData.changed);
      console.log("DOES THIS TRIGGER?");
      // dispatch(fetchFeedbackData());
      dispatch(uiActions.initialPageLoad(false));
      return;
    }
  }, [dispatch, isInitialPageLoad, feedbackData.changed]);

  const { data: session, status } = useSession();

  return (
    <section className="bg-white w-full rounded-lg shadow-md p-8 mb-12">
      <h1 className="font-bold text-darker-navy text-lg">
        {comments[0]?.comments?.length || 0} Comments
      </h1>
      {comments[0]?.comments?.map((eachComment) => (
        <article
          key={eachComment.id}
          className={`border-b-2 border-grey ${
            eachComment.replies ? "border-b-2 border-grey mt-4" : ""
          }`}
        >
          <div className="w-full pt-6 flex pb-4">
            <Image
              src={eachComment.user.image || DefaultAvatar}
              alt={eachComment.user.name || "Photo of the user"}
              width={60}
              height={60}
              className="rounded-full mr-4"
            />
            <div className="flex justify-between w-full items-baseline">
              <div>
                <h2 className="text-xl text-darker-navy">
                  {eachComment.user.name}
                </h2>
                <h3 className="text-slate">@{eachComment.user.username}</h3>
              </div>
              {status === 'authenticated' && <button
                className="font-bold text-navy"
                onClick={() => {
                  dispatch(uiActions.isReplying(eachComment.user.username));
                }}
              >
                Reply
              </button>}
            </div>
          </div>
          <div
            className={`pb-8 ${
              eachComment.replies ? "border-l-2 border-grey ml-6" : ""
            }`}
          >
            <p
              className={`text-slate pl-20 -ml-2 ${
                eachComment.replies ? "!-ml-8" : ""
              }`}
            >
              {eachComment.content}
            </p>
          </div>
          {isReplying === eachComment.user.username && (
            <div
              className={`w-full flex h-22 pt-2 gap-4 justify-between pb-4 pl-16`}
            >
              <textarea
                className="bg-off-white p-4 w-5/6 rounded-lg"
                required
                placeholder="Type your response here"
                ref={newCommentRef}
              />
              <button
                className="bg-purple text-white rounded-lg h-12 w-28"
                onClick={() => {
                  const newCommentContent = newCommentRef.current?.value;
                  const userComment = {
                    currentState: currentState,
                    index: comments,
                    currentPost: eachComment,
                    newComment: {
                      content: newCommentContent,
                      replyingTo: eachComment.user.username,
                      // this should be the current user
                      user: {
                        image: session?.user?.image,
                        name: session?.user?.name,
                        username: session?.user?.name,
                      },
                    },
                  };

                  dispatch(feedbackActions.updateComment(userComment));
                  dispatch(uiActions.isReplying(null));
                  newCommentRef.current!.value = "";
                }}
              >
                Post Reply
              </button>
            </div>
          )}
          {eachComment.replies?.map((reply) => (
            <FeedbackCommentReply key={reply.user.name} reply={reply} />
          ))}
        </article>
      ))}
    </section>
  );
};

export default FeedbackItemComments;
