import type { ReactNode } from "react";

interface MobileScreenProps {
  children: ReactNode;
}

export function MobileScreen({ children }: MobileScreenProps) {
  return (
    <div className="min-h-dvh w-full overflow-x-hidden bg-gmail-bg">
      <div className="relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col overflow-x-hidden bg-gmail-bg shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
        {children}
      </div>
    </div>
  );
}