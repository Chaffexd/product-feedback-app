import FeedbackItemHeader from "@/components/Feed/FeedbackItemHeader";
import { Feedback } from "@/components/Models/models";

export async function generateStaticParams() {
  const response = await fetch(
    "https://project-feedback-app-3bf2b-default-rtdb.europe-west1.firebasedatabase.app/productRequests.json"
  );

  if (!response.ok) {
    throw new Error("Failed to generate params")
  }

  const feedbackItems = await response.json();

  // transform the data into an array and format daya
  // it extracts an array which holds keys, we then map to create a new array of objects
  // joining the object with the id
  const formattedFeedbackItems = Object.keys(feedbackItems).map((key) => ({
    id: key,
    ...feedbackItems[key]
  }))

  // next js requires the ID to be a string, so we're converting it for the sake of URL
  return formattedFeedbackItems.map((item) => ({
    feedbackId: item.id.toString()
  }));
}

const FeedbackDetailPage = ({ params }: { params: { feedbackId: number } }) => {
  return (
    <main className="w-full">
      <FeedbackItemHeader />
    </main>
  );
};

export default FeedbackDetailPage;
