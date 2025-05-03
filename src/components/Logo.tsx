import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"}>
      <img src="/img/logo.svg" alt="Logo app" />
    </Link>
  );
};

export default Logo;
