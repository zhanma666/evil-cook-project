import React, { useState } from 'react';
import '../index.css';

const Input = ({
  label,
  id,
  error,
  className = '',
  type = 'text',
  ...props
}) => {
  const [inputType, setInputType] = useState(type);
  const baseClasses = 'form-input';
  const errorClass = error ? 'input-error' : '';
  
  const combinedClasses = [
    baseClasses,
    errorClass,
    className
  ].filter(Boolean).join(' ');

  const togglePasswordVisibility = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <div className="input-wrapper">
        <input
          id={id}
          className={combinedClasses}
          type={inputType}
          {...props}
        />
        {type === 'password' && (
          <button
            type="button"
            className="password-toggle"
            onClick={togglePasswordVisibility}
            aria-label={inputType === 'password' ? '显示密码' : '隐藏密码'}
          >
            {inputType === 'password' ? '👁️' : '🙈'}
          </button>
        )}
      </div>
      {error && (
        <div className="error-message" role="alert">
          <i className="error-icon">⚠️</i>
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;