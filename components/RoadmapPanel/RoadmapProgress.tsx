import { Feedback } from "../Models/models";
import RoadmapFeedbackItem  from './RoadmapFeedbackItem';
type RoadmapProps = {
  plannedFeedback: Feedback[];
  inprogressFeedback: Feedback[];
  liveFeedback: Feedback[];
}

const RoadmapProgress = ({ plannedFeedback, inprogressFeedback, liveFeedback }: RoadmapProps) => {

  return (
    <div className="w-full grid grid-cols-3 gap-8	pt-4 pb-8">
      <div>
        <h1 className="font-bold text-darker-navy">Planned ({ plannedFeedback.length })</h1>
        <p className="text-slate">Ideas for prioritized research</p>
        <div>
          {plannedFeedback.map((item) => <RoadmapFeedbackItem key={item.id} feedback={item} />)}
        </div>
      </div>
      <div>
        <h1 className="font-bold text-darker-navy">In Progress ({ inprogressFeedback.length })</h1>
        <p className="text-slate">Currently being developed</p>
        <div>
          {inprogressFeedback.map((item) => <RoadmapFeedbackItem key={item.id} feedback={item} />)}
        </div>
      </div>
      <div>
        <h1 className="font-bold text-darker-navy">Live ({ liveFeedback.length })</h1>
        <p className="text-slate">Released features</p>
        <div>
          {liveFeedback.map((item) => <RoadmapFeedbackItem key={item.id} feedback={item} />)}
        </div>
      </div>
    </div>
  );
};

export default RoadmapProgress;
