/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */
import React, { useState, useRef } from 'react';
import Reaptcha from 'reaptcha';
// import ReCAPTCHA from 'react-google-recaptcha';
// import axios from 'axios';
import { addComment } from '../../api/comments';
import { ErrorNotification } from '../../types/ErrorNotification';

type Props = {
  onLoad: () => Promise<void>;
  onError: (error: ErrorNotification) => void;
  onComment: (isCommenting: boolean) => void;
  replyTo: string;
};

export const NewCommentForm: React.FC<Props> = ({
  onLoad,
  onError,
  onComment,
  replyTo,
}) => {
  const [commentText, setCommentText] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [homePage, setHomePage] = useState<string>('');
  const [verified, setVerified] = useState<boolean>(false);
  const [captchaToken, setCaptchaToken] = useState('');

  const captchaRef = useRef<Reaptcha>(null);

  const siteKey: string = process.env.REACT_APP_SITE_KEY || '';
  // const apiURL: string = process.env.REACT_APP_API_URL || '';

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setHomePage('');
    setCommentText('');
  };

  const onVerify = () => {
    captchaRef.current?.getResponse().then(res => {
      console.log(res, captchaToken);
      setCaptchaToken(res);
    });
    setVerified(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // const token = captchaRef.current?.getValue();

    // captchaRef.current?.reset();

    try {
      await addComment({
        username: username.trim(),
        email: email.trim(),
        homepage: homePage.trim(),
        messageText: commentText.trim(),
        responseTo: replyTo,
      });

      await onLoad();

      // await axios
      //   .post(apiURL, { token })
      //   .then((res) => {
      //     if (res.data === 'Human') {
      //       setVerified(true);
      //     }

      //     setVerified(false);
      //     console.log(res);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    } catch {
      onError(ErrorNotification.Add);
    } finally {
      resetForm();
      onComment(false);
    }

    console.log(verified);
    setVerified(false);
  };

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const comment = {
  //     username,
  //     email,
  //     homePage,
  //     commentText,
  //   };
  //   // const token = captchaRef.current?.getValue();

  //   // captchaRef.current?.reset();

  //   await axios
  //     .post(apiURL, { captchaToken })
  //     .then((res) => console.log(res))
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //   resetForm();
  // };

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
                <span className="icon is-small is-right">
                  <i className="fas fa-check"></i>
                </span>
              </div>
            </label>
            <p className="help is-success">This username is available</p>
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
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle"></i>
                </span>
              </div>
            </label>
            <p className="help is-danger">This email is invalid</p>
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
                  value={homePage}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => (
                    setHomePage(event.target.value))}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle"></i>
                </span>
              </div>
            </label>
            <p className="help is-danger">This email is invalid</p>
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
          </div>
          <div className="button__container">
            <Reaptcha sitekey={siteKey} onVerify={onVerify} />

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
