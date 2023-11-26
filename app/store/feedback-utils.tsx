// feedback-utils.ts

export const findFeedbackItem = async (feedbackId: number) => {
  const allFeedback = await fetch(
    `https://project-feedback-app-3bf2b-default-rtdb.europe-west1.firebasedatabase.app/productRequests.json`,
    { headers: { "Cache-Control": "no-cache" } }
  );
  const metadata = await allFeedback.json();
  let foundItem = null;
  let firebaseKey = null;

  for (const key in metadata) {
    const currentItem = metadata[key];
    const currentItemID = Number(currentItem.id);
    const targetID = Number(feedbackId);

    if (currentItemID === targetID) {
      foundItem = currentItem;
      firebaseKey = key;
      break;
    }
  }

  return {
    foundItem,
    firebaseKey,
  };
};
