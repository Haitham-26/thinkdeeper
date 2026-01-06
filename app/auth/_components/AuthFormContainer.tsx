import React from "react";

type AuthFormContainerProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode | React.ReactNode[];
};

export const AuthFormContainer: React.FC<AuthFormContainerProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <section className="relative flex-grow flex items-center justify-center px-4 py-12 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />

      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-text-primary mb-3">
            {title}
          </h1>
          {subtitle && (
            <p className="text-text-muted text-lg font-medium">{subtitle}</p>
          )}
        </div>

        <div className="bg-surface border-2 border-border shadow-2xl shadow-primary/5 rounded-[2.5rem] p-8 md:p-12 transition-all duration-300 hover:border-accent/20">
          <div className="flex flex-col gap-6">{children}</div>
        </div>

        <p className="mt-8 text-center text-sm text-text-muted">
          بشرائك أو تسجيلك، أنت توافق على{" "}
          <span className="text-accent underline cursor-pointer">
            شروط الاستخدام
          </span>
        </p>
      </div>
    </section>
  );
};
