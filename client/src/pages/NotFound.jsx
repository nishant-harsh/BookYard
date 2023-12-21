import { Button } from "@/components/ui/button";
import BG from "../assets/notFound.svg";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center w-full flex-1 p-6">
      <img src={BG} alt="404 img" className="w-2/5" />
      <Button onClick={() => navigate("/")}>Go Back to HomePage</Button>
    </div>
  );
};

export default NotFound;
