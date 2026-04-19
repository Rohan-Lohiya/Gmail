"use client";

import Link from "next/link";
import {
  Camera,
  ChevronUp,
  Cloud,
  Plus,
  UserCog,
  X,
} from "lucide-react";

import { useMailsStore } from "@/hooks/use-mails-store";

export default function AccountPage() {
  const { firstMail } = useMailsStore();
  const profileImage = firstMail?.avatar.imageUrl;

  return (
    <div className="min-h-screen bg-gmail-bg">
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-gmail-bg px-4 pb-6 pt-5">
        <header className="flex items-center justify-end">
          <Link
            href="/"
            aria-label="Close account switcher"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gmail-text"
          >
            <X className="h-7 w-7" />
          </Link>
        </header>

        <main className="flex-1 pb-4 pt-2">
          <section className="text-center">
            <p className="text-[1.9rem] font-medium text-gmail-text">sugam7212@gmail.com</p>

            <div className="relative mx-auto mt-4 h-28 w-28 rounded-full bg-[#13202d] p-[3px]">
              {profileImage ? (
                <div
                  className="h-full w-full rounded-full border-[2px] border-[#2fbc53] bg-cover bg-center"
                  style={{ backgroundImage: `url("${profileImage}")` }}
                  aria-label="Account profile picture"
                />
              ) : (
                <div className="h-full w-full rounded-full border-[2px] border-[#2fbc53] bg-[#101820]" />
              )}
              <span className="absolute bottom-1 right-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#5a5b5f] text-[#eceff3]">
                <Camera className="h-4 w-4" />
              </span>
            </div>

            <h1 className="mt-4 text-[2.8rem] font-medium text-gmail-text">Hi, Utkarsh!</h1>

            <button
              type="button"
              className="mt-4 inline-flex h-14 w-full items-center justify-center rounded-full border border-gmail-chip-border bg-transparent text-[1.3rem] font-medium text-gmail-text"
            >
              Manage your Google Account
            </button>
          </section>

          <section className="mt-6 overflow-hidden rounded-[26px] bg-gmail-card shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h2 className="text-[1.5rem] font-medium text-gmail-text">Switch account</h2>
              <button
                type="button"
                aria-label="Collapse account list"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#2d3136] text-gmail-secondary"
              >
                <ChevronUp className="h-5 w-5" />
              </button>
            </div>

            <div className="divide-y divide-white/10">
              <button type="button" className="flex w-full items-center gap-4 px-5 py-4 text-left">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#8d5cf5] text-sm font-bold text-[#efebff]">
                  U
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[1.2rem] font-medium text-gmail-text">
                    UTKARSH UTKARSH
                  </span>
                  <span className="block truncate text-[1rem] text-gmail-secondary">utkarsh22b@iiitg.ac.in</span>
                </span>
              </button>

              <button type="button" className="flex w-full items-center gap-4 px-5 py-4 text-left">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#2e8d2d] text-[1.3rem] font-medium text-[#d8f3d7]">
                  T
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[1.2rem] font-medium text-gmail-text">Tony Stark</span>
                  <span className="block truncate text-[1rem] text-gmail-secondary">
                    starktony1223555@gmail.com
                  </span>
                </span>
              </button>

              <button type="button" className="flex w-full items-center gap-4 px-5 py-4 text-left">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#2d3136] text-gmail-text">
                  <Plus className="h-6 w-6" />
                </span>
                <span className="text-[1.2rem] font-medium text-gmail-text">Add another account</span>
              </button>

              <button type="button" className="flex w-full items-center gap-4 px-5 py-4 text-left">
                <span className="inline-flex h-12 w-12 items-center justify-center text-gmail-secondary">
                  <UserCog className="h-6 w-6" />
                </span>
                <span className="text-[1.2rem] font-medium text-gmail-text">
                  Manage accounts on this device
                </span>
              </button>
            </div>
          </section>

          <section className="mt-5 rounded-[26px] bg-gmail-card px-5 py-5 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
            <div className="flex items-center gap-2 text-gmail-text">
              <Cloud className="h-5 w-5 text-[#8ab4f8]" />
              <span className="text-[1.1rem] font-medium">0% of 5 TB used</span>
            </div>

            <div className="mt-3 h-1.5 rounded-full bg-[#3a3f46]">
              <div className="h-full w-[4%] rounded-full bg-[#f28b82]" />
            </div>

            <p className="mt-3 text-[1rem] text-gmail-secondary">2.05 GB of 5 TB</p>

            <div className="mt-5 flex items-center gap-5 text-[1.15rem] font-medium text-[#f28b82]">
              <button type="button">Get storage</button>
              <button type="button">Clean up space</button>
            </div>
          </section>
        </main>

        <footer className="pt-3 text-center text-[1rem] text-gmail-secondary">
          <span>Privacy Policy</span>
          <span className="mx-4">•</span>
          <span>Terms of Service</span>
        </footer>

        <div className="mx-auto mt-4 h-1.5 w-36 rounded-full bg-white/70" />

        <Link href="/" className="sr-only">
          Back to inbox
        </Link>
      </div>
    </div>
  );
}