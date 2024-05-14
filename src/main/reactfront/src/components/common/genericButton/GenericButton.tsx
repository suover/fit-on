import React, { useRef } from 'react';
import { CustomButton, CustomButtonProps } from './GenericButton.styles';

const GenericButton: React.FC<CustomButtonProps> = ({
  children,
  type = 'button',
  style = {},
  onClick,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (button) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <CustomButton
      type={type}
      style={style}
      onClick={handleClick}
      ref={buttonRef}
    >
      {children}
    </CustomButton>
  );
};

export default GenericButton;
