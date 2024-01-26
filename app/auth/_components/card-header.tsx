import { CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["600", "700", "800", "900"],
});
interface CardHeaderProps {
  label?: string;
}
const Header = ({ label }: CardHeaderProps) => {
  return (
    <CardHeader>
      <div className="w-full text-center space-y-2">
        <h1 className={cn("text-4xl font-bold", poppins.className)}>🔐Auth</h1>
        <p className="text-muted-foreground">{label}</p>
      </div>
    </CardHeader>
  );
};

export default Header;
