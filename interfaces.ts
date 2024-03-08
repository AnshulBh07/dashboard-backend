interface IComment {
  comment_id: number;
  user_id: number;
  username: string;
  comment_text: string;
  timestamp: string;
  parent_comment: number | null; //stores the id of parent comment, if a root comment, stores null
}

interface IReactions {
  like?: number;
  love?: number;
  haha?: number;
  sad?: number;
  angry?: number;
  wow?: number;
}

export interface ISocialMediaPost {
  post_id: number;
  username: string;
  post_content: string;
  media: string | null;
  media_type: "photo" | "video" | null;
  timestamp: string;
  likes: number;
  comments: IComment[];
  reactions: IReactions;
  link_click: number;
  views: number;
  shares: number;
}
