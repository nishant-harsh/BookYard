import { Github, Linkedin, Star } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

const FooterLinks = () => {
  return (
    <HoverCard>
      <HoverCardTrigger>Navdeep Khede</HoverCardTrigger>
      <HoverCardContent className="w-fit">
        <div className="flex justify-between space-x-4">
          <div className="space-y-2 font-normal">
            <h4 className="text-sm font-semibold">@NavdeepKhede</h4>
            <div className="flex space-x-2">
              <div className="flex items-center p-2 rounded-md hover:bg-slate-50 justify-center">
                <Star className="mr-2 h-4 w-4 opacity-60" />
                <a
                  href="https://drive.google.com/file/d/1EuiTMHgW4ys9xxI23pSqlThPUuewxNWf/view"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-muted-foreground"
                >
                  Resume
                </a>
              </div>
              <div className="flex items-center p-2 rounded-md hover:bg-slate-50 justify-center">
                <Linkedin className="mr-2 h-4 w-4 opacity-60" />
                <a
                  href="https://www.linkedin.com/in/navdeep-khede-181a94200/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-muted-foreground"
                >
                  Linkedin
                </a>
              </div>
              <div className="flex items-center p-2 rounded-md hover:bg-slate-50 justify-center">
                <Github className="mr-2 h-4 w-4 opacity-60" />
                <a
                  href="https://github.com/NavdeepKhede"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-muted-foreground"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default FooterLinks;
