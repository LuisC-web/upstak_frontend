import { Link, useNavigate } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import { ConfirmToken } from "@/types/authTypes";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "@/api/AuthApi";
import { toast } from "react-toastify";
export default function ConfirmAccountView() {
  const navigate = useNavigate();
  const [token, setToken] = useState<ConfirmToken["token"]>("");
  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onSuccess: (data) => {
      toast.success(data?.msg);
      navigate("/auth/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleComplete = (token: ConfirmToken["token"]) => {
    mutate(token);
  };
  return (
    <>
      <h1 className="text-5xl font-black text-white">Confirma tu Cuenta</h1>
      <p className="text-2xl font-light text-white mt-5">
        Ingresa el código que recibiste {""}
        <span className=" text-fuchsia-500 font-bold"> por e-mail</span>
      </p>
      <form className="space-y-8 p-10 bg-white mt-10">
        <label className="font-normal text-2xl text-center block">
          Código de 6 dígitos
        </label>
        <div className="gap-5 flex justify-center">
          <PinInput
            value={token}
            onChange={(token: ConfirmToken["token"]) => setToken(token)}
            onComplete={handleComplete}
          >
            <PinInputField className="w-10 h-10  p-3 rounded-lg border-gray-400 border placeholder-white"></PinInputField>
            <PinInputField className="w-10 h-10  p-3 rounded-lg border-gray-400 border placeholder-white"></PinInputField>
            <PinInputField className="w-10 h-10  p-3 rounded-lg border-gray-400 border placeholder-white"></PinInputField>
            <PinInputField className="w-10 h-10  p-3 rounded-lg border-gray-400 border placeholder-white"></PinInputField>
            <PinInputField className="w-10 h-10  p-3 rounded-lg border-gray-400 border placeholder-white"></PinInputField>
            <PinInputField className="w-10 h-10  p-3 rounded-lg border-gray-400 border placeholder-white"></PinInputField>
          </PinInput>
        </div>
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/resend-code"
          className="text-center text-gray-300 font-normal"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>
    </>
  );
}
