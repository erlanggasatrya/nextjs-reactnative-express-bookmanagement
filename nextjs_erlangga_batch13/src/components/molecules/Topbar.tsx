// components/molecules/Topbar.tsx
'use client'
import React from 'react';
import Button from '@/components/atoms/Button';

interface TopbarProps {
    onAddClick: () => void;
};

const Topbar: React.FC<TopbarProps> = ({onAddClick}) => {
  return (
    <div className="pb-4 flex justify-end">
      <Button variant='primary' className='w-[100px] h-[32px] text-center' onClick={onAddClick}>+ Add</Button>
    </div>
  );
};

export default Topbar;