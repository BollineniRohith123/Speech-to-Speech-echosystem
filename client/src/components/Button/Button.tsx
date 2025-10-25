import { FC } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
export const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`border-2 disabled:bg-gray-100 border-purple-400 bg-purple-950 p-2 text-white hover:bg-purple-800 active:bg-purple-700  ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
};


export const SwitchButton: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`border-0 disabled:text-white-100 border-purple-400 bg-transparent p-2 text-purple-300 hover:text-pink-300 active:text-pink-400  ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
};
