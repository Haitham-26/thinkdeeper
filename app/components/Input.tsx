import React from "react";

type InputProps = {
  title: string;
};

export const Input: React.FC<InputProps> = ({ title }) => {
  return (
    <div className="relative flex flex-col">
      <input
        type="text"
        id="name"
        placeholder=" "
        autoComplete="off"
        className="peer border-2 border-gray-200 py-2 px-5 rounded-full outline-none w-full text-white"
      />
      <label
        htmlFor="name"
        className="absolute start-5 top-1/2 -translate-y-1/2 text-white transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:bg-gray-700 peer-focus:px-1 pointer-events-none"
      >
        {title}
      </label>
    </div>
  );
};
