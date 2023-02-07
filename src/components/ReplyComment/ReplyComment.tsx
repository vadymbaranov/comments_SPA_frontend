import React from 'react';
import { CommentType } from '../../types/CommentType';

type Props = {
  reply: CommentType;
  onReply: (replyTo: string) => void;
  onComment: (isCommenting: boolean) => void;
};

export const ReplyComment: React.FC<Props> = ({
  reply,
  onReply,
  onComment,
}) => {
  const {
    username,
    email,
    messageText,
    createdAt,
  } = reply;

  const replyDateCreated = createdAt.slice(0, 10);
  const replyTimeCreated = createdAt.slice(11, 19);

  const handleReplyClick = () => {
    onComment(true);
    onReply(reply.id.toString());
  };

  return (
    <div className="box has-background-warning reply-comment__container" title="comment">
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{username}</strong>
            &nbsp;
            <small>{email}</small>
            &nbsp;
            <small>
              {replyDateCreated}
              &nbsp;
              {replyTimeCreated}
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
  );
};
