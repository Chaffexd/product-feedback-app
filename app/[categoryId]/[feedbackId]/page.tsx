"use client"
import FeedbackItem from "@/components/Feed/FeedbackItem";
import FeedbackItemHeader from "@/components/Feed/FeedbackItemHeader";
import NewComment from "@/components/Feed/NewComment";
import EditModal from "@/components/UI/EditModal";

const FeedbackDetailPage = async ({
  params,
}: {
  params: { feedbackId: number };
}) => {
  const feedbackId = params.feedbackId;

  return (
    <main className="w-full">
      <EditModal feedbackId={feedbackId} />
      <FeedbackItemHeader />
      <FeedbackItem feedbackId={feedbackId} />
      <NewComment feedbackId={feedbackId} />
    </main>
  );
};

export default FeedbackDetailPage;
