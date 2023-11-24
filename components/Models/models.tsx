export type Reply = {
  content: string;
  replyingTo: string;
  user: {
    image: string;
    name: string;
    username: string;
  };
};

export type Comment = {
  id: number;
  content: string;
  user: {
    image: string;
    name: string;
    username: string;
  };
  replies?: Reply[];
};

export type Feedback = {
  id: number;
  key?: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments?: Comment[];
};

export type CommentOrReply = Comment | Reply;
