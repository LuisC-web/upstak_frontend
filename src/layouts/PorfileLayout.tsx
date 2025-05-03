import Tabs from "@/components/porfile/Tabs";
import { Outlet } from "react-router-dom";

function PorfileLayout() {
  return (
    <>
      <Tabs />
      <Outlet />
    </>
  );
}

export default PorfileLayout;
