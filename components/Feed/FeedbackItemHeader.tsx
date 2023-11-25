"use client"
import Link from "next/link";
import ArrowLeft from "@/assets/shared/ArrowLeft";
import { useAppDispatch } from "@/app/store/hooks";
import { uiActions } from "@/app/store/ui-slice";

const FeedbackItemHeader = () => {
  const dispatch = useAppDispatch();


  return (
    <header className="w-full h-12 flex items-center justify-between">
      <Link href={"/"} className="flex items-center">
        <ArrowLeft />
        <span className="ml-2 text-darker-navy">Go back</span>
      </Link>
      <button
        className="bg-darker-navy text-white rounded-lg py-4 px-6"
        onClick={() => {
          dispatch(uiActions.toggle());
        }}
      >
        Edit Feedback
      </button>
    </header>
  );
};

export default FeedbackItemHeader;
