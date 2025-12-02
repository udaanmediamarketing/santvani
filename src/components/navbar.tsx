// import { Link } from "react-router-dom";
// import { Button } from "../components/ui/button";

// const Navbar = () => {
//   const sants = ["Tukaram", "Eknath", "Namdev", "Dnyaneshwar"];

//   return (
//     <nav className="bg-orange-500 shadow-md text-white px-6 py-3 flex justify-between items-center">
//       <h1 className="text-xl font-bold tracking-wide">🕉️ SantVani</h1>
//       <div className="flex gap-3">
//         <Link to="/">
//           <Button variant="secondary" className="text-bg-orange-500 bg-white hover:bg-gray-100">
//             Home
//           </Button>
//         </Link>
//         {sants.map((sant) => (
//           <Link key={sant} to={`/sant/${sant.toLowerCase()}`}>
//             <Button variant="ghost" className="text-white hover:bg-white/20">
//               {sant}
//             </Button>
//           </Link>

//         ))}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { LogIn } from "lucide-react"; 

const Navbar = () => {
  const sants = ["Tukaram", "Eknath", "Namdev", "Dnyaneshwar"];

  return (
    <nav className="bg-orange-500 shadow-md text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold tracking-wide">🕉️ SantVani</h1>

      <div className="flex gap-3 items-center">
        <Link to="/">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 transition-all duration-200"
          >
            Home
          </Button>
        </Link>

        {sants.map((sant) => (
          <Link key={sant} to={`/sant/${sant.toLowerCase()}`}>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 transition-all duration-200"
            >
              {sant}
            </Button>
          </Link>
        ))}

        <Link to="/signin">
          <Button
            variant="secondary"
            className="bg-white text-orange-600 font-semibold hover:bg-gray-100 flex items-center gap-2 transition-all duration-200"
          >
            <LogIn size={18} />
            Sign In
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
