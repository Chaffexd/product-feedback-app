import Link from "next/link";
import data from "../../data.json";
import ArrowUp from "@/assets/shared/ArrowUp";
import Comments from "@/assets/shared/Comments";

type Feedback = {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments?: {
    id: number;
    content: string;
    user: {
      image: string;
      name: string;
      username: string;
    };
    replies?: {
      content: string;
      replyingTo: string;
      user: {
        image: string;
        name: string;
        username: string;
      };
    }[];
  }[];
};

const Suggestion = () => {

  const allFeedback = data.productRequests;

  return (
    <>
      {allFeedback.map((feedback: Feedback) => (
        <Link href={`${feedback.category}/` + feedback.id} key={feedback.id}>
          <article className="w-full bg-off-white shadow-md p-4 rounded-lg mb-4 flex justify-between items-center">
            <div className="flex">
              <div className="mr-8 flex justify-center w-12">
                <span className="bg-grey p-2 h-14 rounded-lg flex flex-col items-center">
                  <ArrowUp />
                  <span className="mt-2">{feedback.upvotes}</span>
                </span>
              </div>
              <div>
                <h1 className="font-bold text-slate mb-4">{feedback.title}</h1>
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
      ))}
    </>
  );
};

export default Suggestion;
