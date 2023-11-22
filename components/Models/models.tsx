export type Feedback = {
  id: number;
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