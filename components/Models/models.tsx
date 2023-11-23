export type Feedback = {
  id: number;
  key?: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments?: {
    id: number;
    content: string;
    user: {
      image: string;
      name: string;
      username: string;
    };
    replies?: {
      content: string;
      replyingTo: string;
      user: {
        image: string;
        name: string;
        username: string;
      };
    }[];
  }[];
};

export type Reply = {
  user: {
    image: string;
    name: string;
    username: string;
  };
  content: string;
  replyingTo?: string;
  replies?: Reply[];
};