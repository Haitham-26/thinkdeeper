import React from "react";

type AuthFormContainerProps = {
  title: string;
  children: React.ReactNode | React.ReactNode[];
};

export const AuthFormContainer: React.FC<AuthFormContainerProps> = ({
  title,
  children,
}) => {
  return (
    <main className="content-center flex-grow px-4 md:px-8">
      <h1 className="md:max-w-xl text-white text-center text-4xl font-bold mx-auto">
        {title}
      </h1>

      <div className="md:max-w-xl px-6 py-8 mx-auto flex flex-col gap-4 mt-6 rounded-2xl border-2 border-gray-100">
        {children}
      </div>
    </main>
  );
};
