import Form from "@/components/Form";
import { Link } from "react-router-dom";

const CreateProjectView = () => {
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Crea un proyecto</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Llena el siguiente formulario para crear un nuevo formulario
        </p>
        <nav className="my-5">
          <Link
            to={"/"}
            className="bg-purple-600 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors w-full"
          >
            Volver a proyecto
          </Link>
        </nav>
        <Form projectId="" edit={false}></Form>
      </div>
    </>
  );
};

export default CreateProjectView;
