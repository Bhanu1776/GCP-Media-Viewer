"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { FiMaximize, FiMinimize, FiRefreshCw, FiX } from "react-icons/fi";

interface MediaViewerProps {
  url: string;
}

export function MediaViewer({ url }: MediaViewerProps) {
  const [mediaType, setMediaType] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!url) return;

    setLoading(true);
    setError(null);

    const extension = url.split(".").pop()?.toLowerCase();

    if (
      ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension || "")
    ) {
      setMediaType("image");
    } else if (["mp4", "webm", "mov"].includes(extension || "")) {
      setMediaType("video");
    } else if (["pdf"].includes(extension || "")) {
      setMediaType("pdf");
    } else if (["mp3", "wav", "ogg"].includes(extension || "")) {
      setMediaType("audio");
    } else {
      setMediaType("unknown");
    }

    setLoading(false);
  }, [url]);

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  const exitFullscreen = () => {
    setIsFullscreen(false);
  };

  const openInNewTab = () => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [isFullscreen]);

  if (!url) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="max-w-md p-6 text-center">
          <div className="mb-6 flex justify-center">
            <svg
              width="120"
              height="120"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeOpacity="0.4"
              />
              <circle
                cx="8.5"
                cy="8.5"
                r="1.5"
                fill="currentColor"
                fillOpacity="0.4"
              />
              <path
                d="M21 15L16 10L5 21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeOpacity="0.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="text-xl text-muted-foreground">
            Enter a URL to view media
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Images, videos, PDFs, and more
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <FiRefreshCw className="mx-auto mb-6 h-12 w-12 animate-spin text-primary" />
          <p className="text-xl text-muted-foreground">Loading your media...</p>
          <p className="mt-2 text-sm text-muted-foreground">
            This won't take long
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="max-w-md p-6 text-center">
          <div className="mb-6 flex justify-center">
            <svg
              width="100"
              height="100"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-destructive"
              />
              <path
                d="M12 8V12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="text-destructive"
              />
              <circle
                cx="12"
                cy="16"
                r="1"
                fill="currentColor"
                className="text-destructive"
              />
            </svg>
          </div>
          <p className="mb-2 text-xl text-destructive">{error}</p>
          <p className="mb-6 text-sm text-muted-foreground">
            The media couldn't be loaded
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setError(null)}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const fullscreenClass = isFullscreen ? "fullscreen" : "";

  if (mediaType === "image") {
    return (
      <div ref={mediaRef} className={`relative h-full w-full`}>
        <div className="absolute right-4 top-4 z-10 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={toggleFullscreen}
            className="size-8 sm:size-10 bg-background/80 backdrop-blur-sm"
          >
            {isFullscreen ? (
              <FiMinimize className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <FiMaximize className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </Button>
        </div>

        <div className={`media-container ${fullscreenClass} p-2 sm:p-4 md:p-6 h-full w-full flex items-center justify-center`}>
          {isFullscreen && (
            <div className="absolute right-4 top-4 z-50">
              <Button
                variant="secondary"
                size="icon"
                onClick={exitFullscreen}
                className="size-10 bg-background/80 backdrop-blur-sm"
              >
                <FiX className="h-5 w-5" />
              </Button>
            </div>
          )}

          <img
            src={url}
            alt="Media preview"
            className="max-h-full max-w-full object-contain rounded-md"
            style={{ maxHeight: isFullscreen ? "95vh" : "calc(100% - 2rem)" }}
          />
        </div>
      </div>
    );
  }

  if (mediaType === "video") {
    return (
      <div ref={mediaRef} className={`relative h-full w-full`}>
        <div className="absolute right-4 top-4 z-10 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={toggleFullscreen}
            className="size-8 sm:size-10 bg-background/80 backdrop-blur-sm"
          >
            {isFullscreen ? (
              <FiMinimize className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <FiMaximize className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </Button>
        </div>

        <div className={`media-container ${fullscreenClass} p-2 sm:p-4 md:p-6 h-full w-full flex items-center justify-center`}>
          {isFullscreen && (
            <div className="absolute right-4 top-4 z-50">
              <Button
                variant="secondary"
                size="icon"
                onClick={exitFullscreen}
                className="size-10 bg-background/80 backdrop-blur-sm"
              >
                <FiX className="h-5 w-5" />
              </Button>
            </div>
          )}

          <video
            src={url}
            controls
            className="max-h-full max-w-full rounded-md"
            style={{ maxHeight: isFullscreen ? "95vh" : "calc(100% - 2rem)" }}
          />
        </div>
      </div>
    );
  }

  if (mediaType === "pdf") {
    return (
      <div ref={mediaRef} className={`relative h-full w-full`}>
        <div className="absolute right-4 top-4 z-10 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={toggleFullscreen}
            className="size-8 sm:size-10 bg-background/80 backdrop-blur-sm"
          >
            {isFullscreen ? (
              <FiMinimize className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <FiMaximize className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </Button>
        </div>

        <div className={`media-container ${fullscreenClass} p-2 sm:p-4 md:p-6 h-full w-full flex items-center justify-center`}>
          {isFullscreen && (
            <div className="absolute right-4 top-4 z-50">
              <Button
                variant="secondary"
                size="icon"
                onClick={exitFullscreen}
                className="size-10 bg-background/80 backdrop-blur-sm"
              >
                <FiX className="h-5 w-5" />
              </Button>
            </div>
          )}

          <iframe
            src={url}
            title="PDF Viewer"
            className="h-full w-full rounded-md"
            style={{ maxHeight: isFullscreen ? "95vh" : "calc(100% - 2rem)" }}
          />
        </div>
      </div>
    );
  }

  if (mediaType === "audio") {
    return (
      <div ref={mediaRef} className={`relative h-full w-full`}>
        <div className="absolute right-4 top-4 z-10 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={toggleFullscreen}
            className="size-8 sm:size-10 bg-background/80 backdrop-blur-sm"
          >
            {isFullscreen ? (
              <FiMinimize className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <FiMaximize className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </Button>
        </div>

        <div className={`media-container ${fullscreenClass} p-2 sm:p-4 md:p-6 h-full w-full flex items-center justify-center`}>
          {isFullscreen && (
            <div className="absolute right-4 top-4 z-50">
              <Button
                variant="secondary"
                size="icon"
                onClick={exitFullscreen}
                className="size-10 bg-background/80 backdrop-blur-sm"
              >
                <FiX className="h-5 w-5" />
              </Button>
            </div>
          )}

          <div className="w-full max-w-md rounded-lg bg-muted/20 p-4 sm:p-8">
            <h3 className="mb-4 text-center text-lg sm:text-xl font-medium">Audio Player</h3>
            <audio
              src={url}
              controls
              className="w-full"
            />
          </div>
        </div>
      </div>
    );
  }

  if (mediaType === "unknown") {
    return (
      <div ref={mediaRef} className={`relative h-full w-full`}>
        <div className="absolute right-4 top-4 z-10 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={toggleFullscreen}
            className="size-8 sm:size-10 bg-background/80 backdrop-blur-sm"
          >
            {isFullscreen ? (
              <FiMinimize className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <FiMaximize className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </Button>
        </div>

        <div className={`media-container ${fullscreenClass} p-2 sm:p-4 md:p-6 h-full w-full flex items-center justify-center`}>
          {isFullscreen && (
            <div className="absolute right-4 top-4 z-50">
              <Button
                variant="secondary"
                size="icon"
                onClick={exitFullscreen}
                className="size-10 bg-background/80 backdrop-blur-sm"
              >
                <FiX className="h-5 w-5" />
              </Button>
            </div>
          )}

          <div className="max-w-md p-4 sm:p-8 text-center">
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto mb-4"
            >
              <rect
                x="2"
                y="4"
                width="20"
                height="16"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M2 10H22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 16L12 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <h3 className="mb-2 text-lg sm:text-xl font-medium">Unknown File Type</h3>
            <p className="mb-4 text-sm sm:text-base text-muted-foreground">
              This file type isn't supported for preview
            </p>
            <Button
              variant="outline"
              className="mt-2"
              onClick={openInNewTab}
            >
              Open file in new tab
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
