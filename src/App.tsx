/* eslint-disable no-console */
import React, { useState, useEffect, useCallback } from 'react';
import './App.scss';

import { CommentType } from './types/CommentType';
import { ErrorNotification } from './types/ErrorNotification';
import { getAllComments } from './api/comments';
import { CommentsList } from './components/CommentsList';

export const App: React.FC = () => {
  const [numberOfComments, setNumberOfComments] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [error, setError] = useState<ErrorNotification>(ErrorNotification.None);

  // const wsURL: string = process.env.WS_API_URL || '';

  const getCommentsFromServer = useCallback(async () => {
    const commentsFromServer = await getAllComments();

    try {
      setComments(commentsFromServer);
      setNumberOfComments(commentsFromServer.length);
    } catch {
      setError(ErrorNotification.NoComments);
    }
  }, [comments]);

  useEffect(() => {
    getCommentsFromServer();
  }, []);

  // useEffect(() => {
  //   const socket = new WebSocket(wsURL);

  //   socket.addEventListener('message', (event) => {
  //     const message = JSON.parse(event.data);

  //     setComments(current => [message, ...current]);
  //   });
  // });
  // const handleSubmit = useCallback(
  //   async (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();

  //     if ()
  //   }
  // )

  console.log(comments);

  return (
    <main className="main">
      <div className="main__container">
        {error !== ErrorNotification.NoComments && (
          <CommentsList
            comments={comments}
            onLoad={getCommentsFromServer}
            onError={setError}
            numberOfComments={numberOfComments}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </main>
  );
};
