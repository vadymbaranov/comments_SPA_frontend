/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { CommentType } from '../../types/CommentType';
import { ReplyComment } from '../ReplyComment';

type Props = {
  comments: CommentType[];
  comment: CommentType;
  onReply: (replyTo: string) => void;
  onComment: (isCommenting: boolean) => void;
};

export const Comment: React.FC<Props> = ({
  comments,
  comment,
  onReply,
  onComment,
}) => {
  const {
    username,
    email,
    messageText,
    createdAt,
  } = comment;

  const dateCreated = createdAt.slice(0, 10);
  const timeCreated = createdAt.slice(11, 19);
  const replies = comments
    .filter((item: CommentType) => comment.id === Number(item.responseTo))
    || null;

  const handleReplyClick = () => {
    onComment(true);
    onReply(comment.id.toString());
  };

  return (
    <>
      <div className="box" title="comment">
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{username}</strong>
              &nbsp;
              <small>{email}</small>
              &nbsp;
              <small>
                {dateCreated}
                &nbsp;
                {timeCreated}
              </small>
              <br></br>
              {messageText}
            </p>
          </div>
          <nav className="level is-mobile">
            <div className="level-left">
              <a
                href="#comment-form"
                className="level-item"
                aria-label="reply"
                onClick={handleReplyClick}
                onKeyDown={handleReplyClick}
              >
                <span className="icon is-small">
                  <i className="fas fa-reply" aria-hidden="true"></i>
                </span>
              </a>
            </div>
          </nav>
        </div>
      </div>

      {replies.map(reply => (
        <ReplyComment
          key={reply.id}
          reply={reply}
          onReply={handleReplyClick}
          onComment={onComment}
        />
      ))}
    </>
  );
};
