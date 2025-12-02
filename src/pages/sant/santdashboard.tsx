import { useParams } from "react-router-dom";
interface SantDashboardProps {
  activeMenu: string;
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>; // keep type
}

export default function SantDashboard(props: SantDashboardProps) {
  const { name } = useParams<{ name: string }>();
  const { activeMenu } = props;

  return (
    <div className="min-h-screen bg-[#def1de]">
      {/* REMOVE SantNavbar from here */}
      <div className="p-6 text-center">
        {activeMenu === "home" && <p className="text-center text-4xl text-amber-600 mt-4">Welcome to {name}'s Dashboard</p>}
        {activeMenu === "Videos" && <h2 className="text-3xl">Videos</h2>}
        {activeMenu === "Photos" && <h2 className="text-3xl">Photos</h2>}
        {activeMenu === "Blogs" && <h2 className="text-3xl">Blogs</h2>}
        {activeMenu === "About" && <h2 className="text-3xl">About</h2>}
        {activeMenu === "Help" && <h2 className="text-3xl">Help</h2>}
      </div>
    </div>
  );
}