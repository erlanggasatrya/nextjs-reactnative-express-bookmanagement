// components/atoms/ActionButton.tsx
'use client'
import Image from 'next/image';
import React from 'react';

interface ActionButtonProps {
  iconSrc: string;
  variant: 'view' | 'edit' | 'delete';
  onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ iconSrc, variant, onClick }) => {
    let bgColor = '';
    switch (variant) {
        case 'view':
            bgColor = '';
            break;
        case 'edit':
            bgColor = '';
            break;
        case 'delete':
            bgColor = '';
            break;
    }

  return (
    <button className={`${bgColor} text-white p-2 rounded cursor-pointer`} onClick={onClick}>
      <Image src={iconSrc} alt={`${variant} icon`} width={24} height={24}/>
    </button>
  );
};

export default ActionButton;