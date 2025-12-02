// import { useRouter } from "next/router";
// import { _Translator } from "next-intl";

// interface SantDashboardProps {
//   activeMenu: string;
//   setActiveMenu: React.Dispatch<React.SetStateAction<string>>;
//   t: _Translator;
// }

// export default function SantDashboard({ activeMenu, t }: SantDashboardProps) {
//   const { query } = useRouter();
//   const name = query.name as string;

//   return (
//     <div className="min-h-screen bg-[#def1de]">
//       <div className="p-6 text-center">
//         {activeMenu === "home" && (
//           <p className="text-center text-4xl text-amber-600 mt-4">
//             {t("dashboard.welcome", { name })}
//           </p>
//         )}
//         {activeMenu === "Videos" && <h2 className="text-3xl">{t("dashboard.videos")}</h2>}
//         {activeMenu === "Photos" && <h2 className="text-3xl">{t("dashboard.photos")}</h2>}
//         {activeMenu === "Blogs" && <h2 className="text-3xl">{t("dashboard.blogs")}</h2>}
//         {activeMenu === "About" && <h2 className="text-3xl">{t("dashboard.about")}</h2>}
//         {activeMenu === "Help" && <h2 className="text-3xl">{t("dashboard.help")}</h2>}
//       </div>
//     </div>
//   );
// }


import { useRouter } from "next/router";

interface SantDashboardProps {
  activeMenu: string;
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>;
}

export default function SantDashboard(props: SantDashboardProps) {
const router = useRouter();
const { name } = router.query;

  const { activeMenu } = props;

  return (
    <div className="min-h-screen bg-[#def1de]">
      <div className="p-6 text-center">

        {activeMenu === "home" && (
          <p className="text-center text-4xl text-amber-600 mt-4">
            {name} यांच्या डॅशबोर्डमध्ये आपले स्वागत आहे
          </p>
        )}

        {activeMenu === "Videos" && <h2 className="text-3xl">व्हिडिओ</h2>}
        {activeMenu === "Photos" && <h2 className="text-3xl">छायाचित्रे</h2>}
        {activeMenu === "Blogs" && <h2 className="text-3xl">लेख</h2>}
        {activeMenu === "About" && <h2 className="text-3xl">माहिती</h2>}
        {activeMenu === "Help" && <h2 className="text-3xl">मदत</h2>}
      </div>
    </div>
  );
}