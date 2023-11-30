import { Metadata } from "next";
import FeedbackDetailPage from "./page";

/* export async function generateStaticParams() {
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

export async function generateMetadata({
  params,
}: {
  params: { feedbackId: number };
}) {
  const id = params.feedbackId;

  const allFeedback = await fetch(
    `https://project-feedback-app-3bf2b-default-rtdb.europe-west1.firebasedatabase.app/productRequests.json`,
    { next: { revalidate: 0 } }
  );
  const metadata = await allFeedback.json();
  console.log("META DATA", metadata);
  // const dataArray = Object.values(metadata) as any[];
  let foundItem = null;

  for (const key in metadata) {
    const currentItem = metadata[key];
    const currentItemID = Number(currentItem.id);
    const targetID = Number(id);

    if (currentItemID === targetID) {
      foundItem = currentItem;
      console.log("FIREBASE KEY", key);
      console.log("FOUND ITEM", foundItem);
      break;
    }
  }

  return {
    title: foundItem.title,
    description: foundItem.description,
  };
} */

export const metadata: Metadata = {
    title: "Feedback Item | Product Feedback App",
    description: "Feedback Item | Product Feedback App"
};

export default FeedbackDetailPage;