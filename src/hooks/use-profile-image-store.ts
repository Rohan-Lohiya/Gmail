"use client";

import { useSyncExternalStore } from "react";

const PROFILE_IMAGE_KEY = "gmail-clone-profile-image-v1";
type Listener = () => void;
const listeners = new Set<Listener>();

function readProfileImageSnapshot(): string {
  if (typeof window === "undefined") {
    return "";
  }

  return window.localStorage.getItem(PROFILE_IMAGE_KEY) ?? "";
}

function subscribe(listener: Listener): () => void {
  listeners.add(listener);

  if (typeof window === "undefined") {
    return () => {
      listeners.delete(listener);
    };
  }

  const onStorage = (event: StorageEvent) => {
    if (event.key === PROFILE_IMAGE_KEY) {
      listener();
    }
  };

  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function notify() {
  for (const listener of listeners) {
    listener();
  }
}

export function useProfileImageStore() {
  const profileImageUrl = useSyncExternalStore(subscribe, readProfileImageSnapshot, () => "");

  function setProfileImageUrl(url: string) {
    if (typeof window === "undefined") {
      return;
    }

    const normalized = url.trim();
    if (normalized) {
      window.localStorage.setItem(PROFILE_IMAGE_KEY, normalized);
    } else {
      window.localStorage.removeItem(PROFILE_IMAGE_KEY);
    }

    notify();
  }

  return {
    profileImageUrl,
    setProfileImageUrl,
  };
}