/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
} from 'react';
import Reaptcha from 'reaptcha';
import { addComment } from '../../api/comments';
import { ErrorNotification } from '../../types/ErrorNotification';

function hasProperText(str: string) {
  const patternForTagsAndText = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  return patternForTagsAndText.test(str);
}

type Props = {
  onLoad: () => Promise<void>;
  onComment: (isCommenting: boolean) => void;
  replyTo: string;
};

export const NewCommentForm: React.FC<Props> = ({
  onLoad,
  onComment,
  replyTo,
}) => {
  const [commentText, setCommentText] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [homepage, setHomepage] = useState<string>('');
  const [verified, setVerified] = useState<boolean>(false);
  const [captchaToken, setCaptchaToken] = useState('');
  const [properTextWithTags, setProperTextWithTags] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File>();
  const [textFile, setTextFile] = useState<File>();
  // const [fileInput] = useState(React.createRef());

  const captchaRef = useRef<Reaptcha>(null);

  const siteKey = '6Lf9IEAkAAAAAHEUJ1qBQQp2G8FZerPoBP3iuLcm';

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setHomepage('');
    setCommentText('');
  };

  const verify = () => {
    captchaRef.current?.getResponse().then(res => {
      setCaptchaToken(res);
    });

    if (!captchaToken) {
      setVerified(false);
    }

    setVerified(true);
  };

  useEffect(() => {
    return () => verify();
  });

  const handleImageFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleTextFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setTextFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (hasProperText(commentText)) {
      setProperTextWithTags(true);
    }

    try {
      await addComment({
        username: username.trim(),
        email: email.trim(),
        homepage: homepage.trim(),
        messageText: commentText.trim(),
        responseTo: replyTo,
      });

      await onLoad();
    } catch {
      throw new Error(ErrorNotification.Add);
    } finally {
      resetForm();
      onComment(false);
    }

    setVerified(false);
    // setFileInput([]);
  };

  return (
    <div className="comment comment__container" title="commentForm">
      <a id="comment-form">
        <form onSubmit={handleSubmit} className="box comment__form">
          <div className="form__title">
            <h2 className="subtitle is-3">Add a new comment</h2>

            <button
              aria-label="Save"
              onClick={() => onComment(false)}
              type="button"
              className="delete is-danger button__close"
            >
            </button>
          </div>
          <div className="field">
            <label htmlFor="username" className="label">
              Username:
              <div className="control has-icons-left has-icons-right">
                <input
                  name="username"
                  required
                  type="text"
                  className="input input-username"
                  placeholder="User name goes here"
                  value={username}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => (
                    setUsername(event.target.value))}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
              </div>
            </label>
          </div>

          <div className="field">
            <label htmlFor="email" className="label">
              Email:
              <div className="control has-icons-left has-icons-right">
                <input
                  name="email"
                  required
                  type="email"
                  className="input input-email"
                  placeholder="example@example.com"
                  value={email}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => (
                    setEmail(event.target.value))}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
            </label>
          </div>

          <div className="field">
            <label htmlFor="homepage" className="label">
              Homepage:
              <div className="control has-icons-left has-icons-right">
                <input
                  name="homepage"
                  type="url"
                  className="input input-homepage"
                  placeholder="https://example.com"
                  value={homepage}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => (
                    setHomepage(event.target.value))}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-solid fa-globe"></i>
                </span>
              </div>
            </label>
          </div>

          <div className="field">
            <label htmlFor="comment" className="label">
              New comment:
              <div className="control">
                <textarea
                  name="comment"
                  className="input input-comment"
                  placeholder="Your comment goes here"
                  value={commentText}
                  onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => (
                    setCommentText(event.target.value))}
                >
                </textarea>
              </div>
            </label>
            {properTextWithTags && (
              <p className="help is-danger">This text is not valid. Check it for valid HTML code!</p>
            )}
          </div>

          <div className="file is-info has-name">
            <label htmlFor="file-image" className="file-label">
              <input
                className="file-input"
                type="file"
                name="file"
                accept=".png, .gif, .jpg, .jpeg"
                onChange={handleImageFileChange}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-cloud-upload-alt"></i>
                </span>
                <span className="file-label">
                  Attach image here
                </span>
              </span>
              <span className="file-name">
                {imageFile}
              </span>
            </label>
          </div>

          <div className="file is-warning has-name">
            <label htmlFor="file-text" className="file-label">
              <input
                className="file-input"
                type="file"
                name="file"
                accept=".txt"
                onChange={handleTextFileChange}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-cloud-upload-alt"></i>
                </span>
                <span className="file-label">
                  Attach text here
                </span>
              </span>
              <span className="file-name">
                {textFile}
              </span>
            </label>
          </div>

          <div className="button__container">
            <Reaptcha sitekey={siteKey} onVerify={verify} />

            <button
              type="submit"
              className="button is-success is-outlined button__send"
              disabled={!username || !email || !commentText || !verified}
            >
              Send
            </button>
          </div>
        </form>
      </a>
    </div>
  );
};
