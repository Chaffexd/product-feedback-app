import React from "react";
import { Feedback } from "../Models/models";
import ArrowUp from "@/assets/shared/ArrowUp";
import Comments from "@/assets/shared/Comments";
import Link from "next/link";

type RoadmapFeedbackItem = {
  feedback: Feedback;
};

const RoadmapFeedbackItem = ({ feedback }: RoadmapFeedbackItem) => {
  const status =
    feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1);
  return (
    <Link href={`${feedback.category}/${feedback.id}`}>
      <div
        className={`w-full bg-white rounded-lg h-auto my-4 p-4
    ${
      feedback.status === "planned"
        ? "border-t-4 !border-t-orange"
        : feedback.status === "in-progress"
        ? "border-t-4 !border-t-purple"
        : feedback.status === "live"
        ? "border-t-4 !border-t-baby-blue"
        : ""
    }
    `}
      >
        <div className="flex items-center pb-2">
          <span
            className={`h-2 w-2 mr-2 rounded-full bg-purple block 
            ${
              feedback.status === "planned"
                ? "!bg-orange"
                : feedback.status === "in-progress"
                ? "!bg-purple"
                : feedback.status === "live"
                ? "!bg-baby-blue"
                : ""
            }
        `}
          ></span>
          <span>{status}</span>
        </div>
        <h1 className="font-bold text-darker-navy pb-2">{feedback.title}</h1>
        <p className="text-slate pb-4">{feedback.description}</p>
        <button className="p-2 bg-grey rounded-lg py-2 px-4 text-blue h-10 w-auto mr-4 text-center font-normal mb-2">
          {feedback.category}
        </button>
        <div className="flex w-full items-center justify-between">
          <div className="bg-grey w-18 p-2 h-12 rounded-lg flex items-center">
            <ArrowUp />
            <span className="pl-2">{feedback.upvotes}</span>
          </div>
          <div className="flex items-center">
            <i>
              <Comments />
            </i>
            <p className="pl-2">
              {feedback.comments?.length === undefined
                ? "0"
                : feedback.comments?.length}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RoadmapFeedbackItem;
