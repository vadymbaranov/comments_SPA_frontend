import React, { useState } from 'react';
import classNames from 'classnames';
import { CommentType } from '../../types/CommentType';
import { NewCommentForm } from '../NewCommentForm';
import { Comment } from '../Comment/Comment';
import { ErrorNotification } from '../../types/ErrorNotification';
import { Pagination } from '../Pagination';

type Props = {
  comments: CommentType[];
  onLoad: () => Promise<void>;
  onError: (error: ErrorNotification) => void;
  numberOfComments: number;
  currentPage: number;
  onPageChange: (currentPage: number) => void;
};

export const CommentsList: React.FC<Props> = ({
  comments,
  onLoad,
  onError,
  numberOfComments,
  currentPage,
  onPageChange,
}) => {
  const [isCommenting, setIsCommenting] = useState<boolean>(false);
  const [replyTo, setReplyTo] = useState<string>('');

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
                  comments={comments}
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
        onPageChange={onPageChange}
      />
      {isCommenting && (
        <NewCommentForm
          onError={onError}
          onLoad={onLoad}
          onComment={setIsCommenting}
          replyTo={replyTo}
        />
      )}
    </div>
  );
};
