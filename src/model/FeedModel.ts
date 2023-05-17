import { FeedCommentModel } from ".";

export default interface FeedModel extends FeedDto {
  _id: string;
  createdAt: string;
  likes: string[];
  comments: FeedCommentModel[];
  feedId: string;
  updatedAt: string;
}

export interface FeedDto {
  userId: string;
  message: string;
}
