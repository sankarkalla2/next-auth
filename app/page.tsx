import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import LoginButton from "./auth/_components/login-button";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export default function Home() {
  return (
    <main className="bg-red-500 h-[100vh] w-full flex items-center justify-center">
      <div className="text-white space-y-6 text-center">
        <h1
          className={cn("text-6xl font-bold drop-shadow-md", poppins.className)}
        >
          🔐Auth
        </h1>
        <p className="text-lg">A simple authentication servide provider</p>
        <LoginButton>
          <Button size="lg" variant="secondary">
            Sign In
          </Button>
        </LoginButton>
      </div>
    </main>
  );
}
