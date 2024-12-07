import React from 'react';

interface TitleInputProps {
  title: string;
  onChange: (title: string) => void;
}

export const TitleInput: React.FC<TitleInputProps> = ({ title, onChange }) => {
  return (
    <div className="mb-4 md:mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => onChange(e.target.value)}
        placeholder="曲の題名を入力してください"
        className="w-full p-2 text-base md:text-lg border border-gray-300 rounded-md"
      />
      {title && (
        <h2 className="text-xl md:text-2xl font-bold text-center mt-3 md:mt-4">{title}</h2>
      )}
    </div>
  );
};