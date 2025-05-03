import { useForm } from "react-hook-form";
import Errors from "@/components/Errors";
import { Link, useNavigate } from "react-router-dom";
import { UserLoginForm } from "@/types/authTypes";
import { useMutation } from "@tanstack/react-query";
import { authLogin } from "@/api/AuthApi";
import { toast } from "react-toastify";
export default function LoginView() {
  const navigate = useNavigate();
  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };
  const { mutate } = useMutation({
    mutationFn: authLogin,
    onSuccess: (data) => {
      toast.success("iniciando sesión...");
      localStorage.setItem("AUTH_TOKEN", data ? data.msg : "");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleLogin = (formData: UserLoginForm) => {
    mutate(formData);
  };

  return (
    <>
      <h1 className="text-5xl font-black text-white">Inicia sesión</h1>
      <p className="text-2xl font-light text-white my-5">
        Llena el formulario para {""}
        <span className=" text-fuchsia-500 font-bold"> iniciar sesión</span>
      </p>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 bg-white rounded-lg"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <Errors>{errors.email.message}</Errors>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && <Errors>{errors.password.message}</Errors>}
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to={"/auth/register"}
          className="text-center text-gray-300 font-normal"
        >
          ¿No tienes cuenta? Crear una
        </Link>
        <Link
          to={"/auth/forgot-password"}
          className="text-center text-gray-300 font-normal"
        >
          ¿Olvidate tú contraseña? Reestablecer
        </Link>
      </nav>
    </>
  );
}
