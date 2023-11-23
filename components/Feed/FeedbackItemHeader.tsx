import Link from "next/link";
import ArrowLeft from "@/assets/shared/ArrowLeft";

const FeedbackItemHeader = () => {
  return (
    <header className="w-full h-12 flex items-center justify-between">
      <Link href={"/"} className="flex items-center">
        <ArrowLeft />
        <span className="ml-2 text-darker-navy">Go back</span>
      </Link>
      <button className="bg-darker-navy text-white rounded-lg py-4 px-6">Edit Feedback</button>
    </header>
  );
};

export default FeedbackItemHeader;
