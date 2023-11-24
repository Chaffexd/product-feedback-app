import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { Reply } from "../Models/models";
import Image from "next/image";
import { RootState } from "@/app/store/store";
import { uiActions } from "@/app/store/ui-slice";
import DefaultAvatar from '../../assets/default-avatar.jpeg'

type FeedbackCommentProps = {
  reply: Reply;
};

const FeedbackCommentReply = ({ reply }: FeedbackCommentProps) => {
  const dispatch = useAppDispatch();
  const isReplying = useAppSelector((state: RootState) => state.ui.replyingUsername === reply.user.username);

  return (
    <div className="pb-8 ml-6 pl-10 border-l-2 border-grey">
      <div className="flex items-center justify-between pb-4">
        <div className="flex">
          <Image
            src={reply.user.image || DefaultAvatar}
            alt={reply.user.name || "Photo of the user"}
            width={60}
            height={60}
            className="rounded-full mr-4"
          />
          <div>
            <h2 className="text-xl text-darker-navy">{reply.user.name}</h2>
            <h3 className="text-slate">@{reply.user.username}</h3>
          </div>
        </div>
        <div>
          <button
            className="font-bold text-navy"
            onClick={() => dispatch(uiActions.isReplying(reply.user.username))}
          >
            Reply
          </button>
        </div>
      </div>
      <p className="text-slate">{reply.content}</p>
      {isReplying && (
        <div className="w-full flex h-20 pt-2 gap-4 justify-between">
          <textarea
            className="bg-off-white p-4 w-5/6 rounded-lg"
            required
            placeholder="Type your response here"
          />
          <button className="bg-purple text-white rounded-lg h-12 w-28">Post Reply</button>
        </div>
      )}
    </div>
  );
};

export default FeedbackCommentReply;
