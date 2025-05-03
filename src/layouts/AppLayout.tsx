import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "@/components/spinner/Spinner";
const AppLayout = () => {
  const { data, isLoading, isError } = useAuth();
  if (isLoading) return <Spinner />;
  if (isError) {
    return <Navigate to={"/auth/login"} />;
  }
  if (data) {
    return (
      <>
        <Header name={data.name}></Header>
        <section className="max-w-screen-2xl mx-auto mt-10 p-5">
          <Outlet></Outlet>
        </section>
        <footer className="py-5">
          <p className="text-center">
            Todos los derechos reservados {new Date().getFullYear()}
          </p>
        </footer>
        <ToastContainer></ToastContainer>
      </>
    );
  }
};

export default AppLayout;
