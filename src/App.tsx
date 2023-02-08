/* eslint-disable no-console */
import React from 'react';
import './App.scss';
import { CommentsList } from './components/CommentsList';

export const App: React.FC = () => {
  // const wsURL: string = process.env.WS_API_URL || '';

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

  return (
    <main className="main">
      <div className="main__container">
        <CommentsList />
      </div>
    </main>
  );
};
