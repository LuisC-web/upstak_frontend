import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <h1 className="font- black text-center text-4xl text-white">
        Página no encontrada
      </h1>
      <p className="font- black text-center text-4xl text-white">
        Tal vez quiere ir a:{" "}
        <Link className="text-fuchsia-500" to={"/"}>
          Proyectos
        </Link>
      </p>
    </>
  );
}

export default NotFound;
