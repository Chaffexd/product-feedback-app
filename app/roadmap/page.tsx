"use client";
import RoadmapHeader from "@/components/RoadmapPanel/RoadmapHeader";
import Modal from "@/components/UI/Modal";
import RoadmapProgress from "@/components/RoadmapPanel/RoadmapProgress";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { fetchFeedbackData } from "../store/feedback-action";

const RoadMapPage = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state: RootState) => state.feedback.feedback);
  console.log(data);

  // this will return an array of objects that hold status so we can map them out in Roadmap
  const plannedFeedback = data.filter(feedback => feedback.status === 'planned');
  const inprogressFeedback = data.filter(feedback => feedback.status === 'in-progress');
  const liveFeedback = data.filter(feedback => feedback.status === 'live');

  useEffect(() => {
    // run on page load
    dispatch(fetchFeedbackData());

  }, [])

  return (
    <section className="w-full">
      <Modal />
      <RoadmapHeader />
      <RoadmapProgress 
        plannedFeedback={plannedFeedback}
        inprogressFeedback={inprogressFeedback}
        liveFeedback={liveFeedback}
      />
    </section>
  );
};

export default RoadMapPage;
