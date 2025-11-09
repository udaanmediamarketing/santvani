import { useRouter } from "next/router";
import { _Translator } from "next-intl";

interface SantDashboardProps {
  activeMenu: string;
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>;
  t: _Translator;
}

export default function SantDashboard({ activeMenu, t }: SantDashboardProps) {
  const { query } = useRouter();
  const name = query.name as string;

  return (
    <div className="min-h-screen bg-[#def1de]">
      <div className="p-6 text-center">
        {activeMenu === "home" && (
          <p className="text-center text-4xl text-amber-600 mt-4">
            {t("dashboard.welcome", { name })}
          </p>
        )}
        {activeMenu === "Videos" && <h2 className="text-3xl">{t("dashboard.videos")}</h2>}
        {activeMenu === "Photos" && <h2 className="text-3xl">{t("dashboard.photos")}</h2>}
        {activeMenu === "Blogs" && <h2 className="text-3xl">{t("dashboard.blogs")}</h2>}
        {activeMenu === "About" && <h2 className="text-3xl">{t("dashboard.about")}</h2>}
        {activeMenu === "Help" && <h2 className="text-3xl">{t("dashboard.help")}</h2>}
      </div>
    </div>
  );
}