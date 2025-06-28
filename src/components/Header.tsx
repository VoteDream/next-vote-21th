const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-2">
      <header className="font-headline-1 w-full p-4">{children}</header>
    </div>
  );
};

export default Header;
