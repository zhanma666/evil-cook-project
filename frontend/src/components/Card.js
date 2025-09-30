import React from 'react';
import '../index.css';

const Card = ({ 
  children, 
  className = '',
  ...props 
}) => {
  const baseClasses = 'card';
  const combinedClasses = [baseClasses, className].filter(Boolean).join(' ');

  return (
    <div className={combinedClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;