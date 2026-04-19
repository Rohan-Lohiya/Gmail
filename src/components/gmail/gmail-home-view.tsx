"use client";

import { useState } from "react";

import { ComposeFab } from "@/components/gmail/compose-fab";
import { GmailNavigationDrawer } from "@/components/gmail/gmail-navigation-drawer";
import { HomeAppBar } from "@/components/gmail/home-app-bar";
import { InboxToolbar } from "@/components/gmail/inbox-toolbar";
import { MailListItem } from "@/components/gmail/mail-list-item";
import { MobileBottomNav } from "@/components/gmail/mobile-bottom-nav";
import { MobileScreen } from "@/components/gmail/mobile-screen";
import { useMailsStore } from "@/hooks/use-mails-store";
import { useProfileImageStore } from "@/hooks/use-profile-image-store";

export function GmailHomeView() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { mails } = useMailsStore();
  const { profileImageUrl } = useProfileImageStore();

  return (
    <MobileScreen>
      <div className="relative flex flex-1 flex-col">
        {menuOpen ? (
          <button
            type="button"
            aria-label="Close inbox options"
            className="absolute inset-0 z-20 bg-transparent"
            onClick={() => setMenuOpen(false)}
          />
        ) : null}

        <HomeAppBar
          onOpenDrawer={() => setDrawerOpen(true)}
          profileImageUrl={profileImageUrl || undefined}
        />
        <InboxToolbar
          isMenuOpen={menuOpen}
          onToggleMenu={() => setMenuOpen((previousState) => !previousState)}
        />

        <main className="scrollbar-none flex-1 overflow-y-auto pb-24">
          {mails.map((mail) => (
            <MailListItem key={mail.id} mail={mail} />
          ))}
        </main>

        <ComposeFab />
        <MobileBottomNav active="mail" />

        <GmailNavigationDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </div>
    </MobileScreen>
  );
}