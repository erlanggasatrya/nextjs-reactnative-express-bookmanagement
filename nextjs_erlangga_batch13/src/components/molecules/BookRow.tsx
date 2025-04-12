// components/molecules/BookRow.tsx
'use client'
import React from 'react';
import ActionButton from '@/components/atoms/ActionButton';

export interface Book {
  id: number;
  title: string;
  author: string | null;
  publisher: string | null;
  year: string | null;
  description: string | null;
  coverUrl?: string;
}

interface BookRowProps {
  book: Book;
  onDelete: () => void;
  onView: () => void;
  onEdit: () => void;
}

const BookRow: React.FC<BookRowProps> = ({ book, onDelete, onView, onEdit }) => {
  return (
    <tr>
      <td className="px-6 py-2">{book.title}</td>
      <td className="px-6 py-2 whitespace-nowrap">{book.author}</td>
      <td className="px-6 py-2 whitespace-nowrap">{book.publisher}</td>
      <td className="px-6 py-2 whitespace-nowrap">{book.year}</td>
      <td className="px-6 py-2 max-w-140">{book.description}</td>
      <td className="px-6 py-2 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          <ActionButton iconSrc="/view-icon.png" variant="view" onClick={onView}/>
          <ActionButton iconSrc="/edit-icon.png" variant="edit" onClick={onEdit}/>
          <ActionButton iconSrc="/delete-icon.png" variant="delete" onClick={onDelete}/>
        </div>
      </td>
    </tr>
  );
};

export default BookRow;