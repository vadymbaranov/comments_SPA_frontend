import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { getAllComments, getComments } from '../../api/comments';
import { CommentType } from '../../types/CommentType';
import { NewCommentForm } from '../NewCommentForm';
import { Comment } from '../Comment/Comment';
import { ErrorNotification } from '../../types/ErrorNotification';
import { Pagination } from '../Pagination';

const perPage = 25;

export const CommentsList: React.FC = () => {
  const [numberOfComments, setNumberOfComments] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [allComments, setAllComments] = useState<CommentType[]>([]);
  // const [error, setError] = useState<ErrorNotification>(ErrorNotification.None);
  const [isCommenting, setIsCommenting] = useState<boolean>(false);
  const [replyTo, setReplyTo] = useState<string>('');

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getCommentsFromServer = useCallback(async () => {
    try {
      const allCommentsFromServer = await getAllComments();
      const commentsFromServer = await getComments(currentPage, perPage);

      setComments(commentsFromServer);
      setNumberOfComments(allCommentsFromServer.length);
      setAllComments(allCommentsFromServer);
    } catch {
      throw new Error(ErrorNotification.NoComments);
    }
  }, [currentPage]);

  useEffect(() => {
    getCommentsFromServer();
  }, [currentPage]);

  const mainComments = comments.filter((item) => (
    !Object.prototype.hasOwnProperty.call(item, 'responseTo')
    || item.responseTo === 'NULL'));

  return (
    <div className="comments-list__container">
      <h1>Comments List</h1>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                <a href="#/">
                  <span className="icon">
                    <i className="fas fa-sort fa-sort-down" />
                  </span>
                </a>
              </span>
            </th>
          </tr>
        </thead>

        <tbody>
          {mainComments.map((comment) => (
            <tr key={comment.id}>
              <td>
                <Comment
                  comment={comment}
                  comments={allComments}
                  onReply={setReplyTo}
                  onComment={setIsCommenting}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="#comment-form">
        <button
          type="button"
          className={classNames('button is-primary is-outlined', {
            'is-hidden': isCommenting,
          })}
          onClick={() => setIsCommenting(true)}
        >
          Add a new comment
        </button>
      </a>
      <Pagination
        numberOfComments={numberOfComments}
        currentPage={currentPage}
        perPage={perPage}
        onPageChange={handlePageChange}
      />
      {isCommenting && (
        <NewCommentForm
          onLoad={getCommentsFromServer}
          onComment={setIsCommenting}
          replyTo={replyTo}
        />
      )}
    </div>
  );
};
