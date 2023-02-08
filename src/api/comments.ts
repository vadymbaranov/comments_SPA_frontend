import { CommentType } from '../types/CommentType';
import { client } from '../utils/fetchApi';

export const getComments = (page: number, perPage: number) => {
  return client.get<CommentType[]>(`?page=${page}&limit=${perPage}`);
};

export const getAllComments = () => {
  return client.get<CommentType[]>('');
};

export const addComment = (message: Omit<CommentType, 'id' | 'createdAt'>) => {
  return client.post<CommentType>('/messages', message);
};
