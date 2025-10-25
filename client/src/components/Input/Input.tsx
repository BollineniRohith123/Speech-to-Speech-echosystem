type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
}

export const Input = ({className, error, ...props}:InputProps) => {
  return (
    <div className="pb-8 relative">
      <input
        {...props}
        className={`border-2 disabled:bg-gray-100 border-purple-400 bg-purple-950 p-2 outline-none text-white hover:bg-purple-800 focus:bg-purple-800 p-2 ${className ?? ""}`}
      />
      {error && <p className=" absolute text-red-800">{error}</p>}
    </div>
  );
}