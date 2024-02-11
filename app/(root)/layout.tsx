import Navbar from "./settings/_components/navbar";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="pt-40  pl-20">
      <Navbar />
      <div className="w-[500px]">{children}</div>
    </div>
  );
};

export default Layout;
