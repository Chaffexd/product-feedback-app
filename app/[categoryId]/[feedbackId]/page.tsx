import FeedbackItem from "@/components/Feed/FeedbackItem";
import FeedbackItemHeader from "@/components/Feed/FeedbackItemHeader";
import NewComment from "@/components/Feed/NewComment";

export async function generateStaticParams() {
  const response = await fetch(
    "https://project-feedback-app-3bf2b-default-rtdb.europe-west1.firebasedatabase.app/productRequests.json"
  );

  if (!response.ok) {
    throw new Error("Failed to generate params");
  }

  const feedbackItems = await response.json();

  // transform the data into an array and format daya
  // it extracts an array which holds keys, we then map to create a new array of objects
  // joining the object with the id
  const formattedFeedbackItems = Object.keys(feedbackItems).map((key) => ({
    id: key,
    ...feedbackItems[key],
  }));

  // next js requires the ID to be a string, so we're converting it for the sake of URL
  return formattedFeedbackItems.map((item) => ({
    feedbackId: item.id.toString(),
  }));
}

export async function generateMetadata({ params }: { params: { feedbackId: number }}) {
    const id = params.feedbackId;

    const feedbackItem = await fetch(`https://project-feedback-app-3bf2b-default-rtdb.europe-west1.firebasedatabase.app/productRequests/${id}.json`);
    const metadata = await feedbackItem.json();

    return {
        title: metadata.title,
        description: metadata.description
    }
}

const FeedbackDetailPage = ({ params }: { params: { feedbackId: number }}) => {
  const feedbackId = params.feedbackId;

  return (
    <main className="w-full">
      <FeedbackItemHeader />
      <FeedbackItem 
        feedbackId={feedbackId}
      />
      <NewComment />
    </main>
  );
};

export default FeedbackDetailPage;
