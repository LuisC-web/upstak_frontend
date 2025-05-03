import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const MenuBar = ({ name }: { name: string }) => {
  const navigation = useNavigate();
  const queryClient = useQueryClient();
  const logout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    queryClient.invalidateQueries();
    navigation("/auth/login");
  };
  return (
    <Menubar className="bg-gray-100">
      <MenubarMenu>
        <MenubarTrigger>
          <Bars3Icon className="h-5 w-5 text-black" />
        </MenubarTrigger>
        <MenubarContent className="bg-gray-100 shadow-md">
          <MenubarItem className="hover:bg-purple-200 focus:bg-purple-300">
            Hola, {name}
          </MenubarItem>
          <MenubarItem
            className="hover:bg-purple-200 focus:bg-purple-300"
            onClick={() => navigation("/profile")}
          >
            Mi Perfil
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="hover:bg-purple-200 focus:bg-purple-300">
            Mis Proyectos
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem
            className="hover:bg-purple-200 focus:bg-purple-300 text-red-600"
            onClick={logout}
          >
            Cerrar Sesión
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default MenuBar;
