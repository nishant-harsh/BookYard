import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LoginForm from "@/components/forms/LoginForm";

const Login = () => {
  return (
    <>
      <Link
        to="/signup"
        className={"absolute right-4 top-4 md:right-8 md:top-8"}
      >
        <Button variant="ghost" className="font-semibold">
          SignUp
        </Button>
      </Link>
      <LoginForm />
    </>
  );
};

export default Login;
