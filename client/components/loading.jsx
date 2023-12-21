import { Loader2 } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-lg text-zinc-700">
        <span className="flex items-center gap-2">
          <Loader2 className="animate-spin h-8 w-8" /> Please Wait! Loading
          BookYard...
        </span>
      </p>
    </div>
  );
};

export default LoadingPage;
