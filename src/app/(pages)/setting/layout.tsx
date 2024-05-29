import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SettingLeftNavigation } from "@/features/settings/components/SettingLeftNavigation";

export const metadata: Metadata = {
  title: "Setting",
  description: "Account Profile setting.",
};

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/setting",
  },
  {
    title: "Notifications",
    href: "/setting/notifications",
  },
  {
    title: "Payment Methods",
    href: "/setting/payment",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="page-content-wrapper">
      <div className="lg:px-[8rem] lg:py-3 p-2">
        <div className="space-y-0.5">
          <h2 className="lg:text-2xl text-xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="lg:my-4 my-2" />
        <div className="grid grid-cols-5 lg:gap-4 gap-1">
          <aside className="lg:col-span-1 col-span-5">
            <SettingLeftNavigation items={sidebarNavItems} />
          </aside>
          <div className="lg:col-span-4 col-span-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
