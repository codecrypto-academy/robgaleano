import classNames from 'classnames/bind';
import { ButtonHTMLAttributes } from 'react';

import styles from './button.module.scss';

const css = classNames.bind(styles);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

const Button = ({ 
  children, 
  className, 
  variant = 'primary',
  size = 'medium',
  ...props 
}: ButtonProps) => {
  return (
    <button 
      className={css('button', `button-${variant}`, `button-${size}`, className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
