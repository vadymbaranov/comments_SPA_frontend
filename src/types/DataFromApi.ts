import { CommentType } from './CommentType';

export interface DataFromApi {
  next: {
    page: number;
    limit: string;
  };
  prev?: {
    page: number;
    limit: string;
  };

  results: CommentType[];
}
