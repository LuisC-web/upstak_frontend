import NewPasswordToken from "@/components/auth/ NewPasswordToken";
import NewPasswordFormComponent from "@/components/auth/NewPasswordFormComponent";
import { ConfirmToken } from "@/types/authTypes";
import { useState } from "react";

function NewPasswordView() {
  const [token, setToken] = useState<ConfirmToken["token"]>("");
  const [isValidToken, setIsValidToken] = useState(false);
  return (
    <>
      <h1 className="text-5xl font-black text-white">Restablece password</h1>
      <p className="text-2xl font-light text-white my-5">
        Llena el formulario para {""}
        <span className=" text-fuchsia-500 font-bold"> por email</span>
      </p>
      {!isValidToken ? (
        <NewPasswordToken
          token={token}
          setToken={setToken}
          setIsValidToken={setIsValidToken}
        />
      ) : (
        <NewPasswordFormComponent token={token} />
      )}
    </>
  );
}

export default NewPasswordView;
