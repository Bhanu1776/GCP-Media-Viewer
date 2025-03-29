"use client";

import { MediaViewer } from "@/components/media-viewer";
import { ThemeToggle } from "@/components/theme-toggle";
import { UrlInput } from "@/components/url-input";
import { useState } from "react";

export default function Home() {
  const [currentUrl, setCurrentUrl] = useState("");

  const handleUrlChange = (url: string) => {
    setCurrentUrl(url);
  };

  return (
    <div className="flex h-full flex-col lg:flex-row">
      {/* Left sidebar for URL input */}
      <div className="w-full border-b border-border p-4 lg:w-auto lg:min-w-80 lg:max-w-md lg:border-b-0 lg:border-r lg:p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
            GCP Media Viewer
          </h1>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>

        <UrlInput onUrlChange={handleUrlChange} />
      </div>

      {/* Right side for media viewing */}
      <div className="flex-1 overflow-hidden">
        <MediaViewer url={currentUrl} />
      </div>
    </div>
  );
}
