const SubmitButton = ({
  isActive,
  isPink,
  children,
}: {
  isActive: boolean;
  isPink?: boolean;
  children: React.ReactNode;
}) => {
  const style = isActive
    ? isPink
      ? "bg-pink cursor-pointer"
      : "bg-main cursor-pointer"
    : "bg-gray1";
  return (
    <div className="mx-4 my-6">
      <button
        disabled={!isActive}
        className={`${style} font-headline-2 text-gray50 shadow-08 w-full rounded py-3.5 whitespace-nowrap`}
      >
        {children}
      </button>
    </div>
  );
};

export default SubmitButton;
