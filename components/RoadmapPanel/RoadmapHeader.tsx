"use client";
import { useAppDispatch } from "@/app/store/hooks";
import { uiActions } from "@/app/store/ui-slice";
import ArrowLeft from "@/assets/shared/ArrowLeft";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

const RoadmapHeader = () => {
  const dispatch = useAppDispatch();

  const toggleFeedbackHandler = () => {
    dispatch(uiActions.toggle());
  };

  const { data: session, status } = useSession();

  return (
    <form className="w-full bg-darker-navy h-20 rounded-lg flex justify-between items-center text-white px-4 mb-4">
      <div>
        <Link href={"/"} className="flex items-center">
          <ArrowLeft />
          <span className="ml-2">Go back</span>
        </Link>
        <h1 className="font-bold">Roadmap</h1>
      </div>
      {status === "authenticated" ? (
        <button
          type="button"
          className="bg-purple rounded-lg h-12 w-40 hover:"
          onClick={toggleFeedbackHandler}
        >
          + Add Feedback
        </button>
      ) : (
        <button
          className="bg-purple rounded-lg h-12 w-40"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      )}
    </form>
  );
};

export default RoadmapHeader;
