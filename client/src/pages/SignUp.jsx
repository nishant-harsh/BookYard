import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import SignUpForm from "../../components/forms/SignUpForm";

const SignUp = () => {
  return (
    <>
      <Link
        to="/login"
        className={"absolute right-4 top-4 md:right-8 md:top-8"}
      >
        <Button variant="ghost" className="font-semibold">
          Login
        </Button>
      </Link>
      <SignUpForm />
    </>
  );
};

export default SignUp;
