import Image from "next/image";
import { Feedback } from "../Models/models";

type CommentsProps = {
  comments: Feedback[];
};

const FeedbackItemComments = ({ comments }: CommentsProps) => {
  console.log(
    comments.map((comment) => comment.comments?.map((com) => com.content))
  );

  return (
    <section className="bg-white w-full rounded-lg shadow-md p-8 mb-12">
      <h1 className="font-bold text-darker-navy text-lg">
        {comments[0]?.comments?.length || 0} Comments
      </h1>
      {comments[0]?.comments?.map((eachComment) => (
        <article className="border-b-2 border-grey">
          <div className="w-full pt-6 flex pb-4">
            <Image
              src={eachComment.user.image || ""}
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
              <button className="font-bold text-navy">Reply</button>
            </div>
          </div>
          <div className="pb-8">
            <p className="text-slate pl-20 -ml-2">{eachComment.content}</p>
          </div>
        </article>
      ))}
    </section>
  );
};

export default FeedbackItemComments;
