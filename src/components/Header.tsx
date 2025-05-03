import Logo from "@/components/Logo";
import MenuBar from "./MenuBar";

const Header = ({ name }: { name: string }) => {
  return (
    <header className="bg-gray-800 p-5">
      <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="w-64">
          <Logo></Logo>
        </div>
        <MenuBar name={name}></MenuBar>
      </div>
    </header>
  );
};

export default Header;
