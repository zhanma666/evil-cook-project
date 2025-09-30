import React, { useState } from 'react';
import Button from './Button';
import './Comment.css';

const Comment = ({ comment, onReply, onLike }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyContent.trim()) {
      onReply(comment.id, replyContent);
      setReplyContent('');
      setShowReplyForm(false);
    }
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <div className="comment-author">
          <div className="author-avatar">
            {comment.author.avatar ? (
              <img src={comment.author.avatar} alt={comment.author.username} />
            ) : (
              <div className="avatar-placeholder">👤</div>
            )}
          </div>
          <div className="author-info">
            <span className="author-name">{comment.author.username}</span>
            {comment.author.level && (
              <span className="author-level">{comment.author.level}</span>
            )}
          </div>
        </div>
        <div className="comment-time">{comment.time}</div>
      </div>
      
      <div className="comment-content">
        <p>{comment.content}</p>
      </div>
      
      <div className="comment-actions">
        <Button 
          variant="secondary" 
          size="small" 
          onClick={() => onLike(comment.id)}
          className={comment.liked ? 'liked' : ''}
        >
          ❤️ {comment.likes}
        </Button>
        <Button 
          variant="secondary" 
          size="small" 
          onClick={() => setShowReplyForm(!showReplyForm)}
        >
          💬 回复
        </Button>
      </div>
      
      {showReplyForm && (
        <form className="reply-form" onSubmit={handleReplySubmit}>
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="写下你的回复..."
            className="reply-input"
            rows="3"
          />
          <div className="reply-actions">
            <Button 
              variant="secondary" 
              size="small" 
              onClick={() => setShowReplyForm(false)}
            >
              取消
            </Button>
            <Button 
              variant="primary" 
              size="small" 
              type="submit"
            >
              发布回复
            </Button>
          </div>
        </form>
      )}
      
      {comment.replies && comment.replies.length > 0 && (
        <div className="replies">
          {comment.replies.map(reply => (
            <div key={reply.id} className="reply">
              <div className="reply-header">
                <div className="reply-author">
                  <div className="author-avatar">
                    {reply.author.avatar ? (
                      <img src={reply.author.avatar} alt={reply.author.username} />
                    ) : (
                      <div className="avatar-placeholder">👤</div>
                    )}
                  </div>
                  <div className="author-info">
                    <span className="author-name">{reply.author.username}</span>
                    {reply.author.level && (
                      <span className="author-level">{reply.author.level}</span>
                    )}
                  </div>
                </div>
                <div className="reply-time">{reply.time}</div>
              </div>
              <div className="reply-content">
                <p>{reply.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;