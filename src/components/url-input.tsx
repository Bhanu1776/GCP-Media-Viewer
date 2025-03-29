"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSettingsStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { FiCopy, FiEdit2, FiExternalLink, FiRefreshCw } from "react-icons/fi";

interface UrlInputProps {
  onUrlChange: (url: string) => void;
}

export function UrlInput({ onUrlChange }: UrlInputProps) {
  const { baseUrl, setBaseUrl } = useSettingsStore();
  const [urlSegment, setUrlSegment] = useState("");
  const [fullUrl, setFullUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [tempBaseUrl, setTempBaseUrl] = useState(baseUrl);

  useEffect(() => {
    const newUrl = urlSegment ? `${baseUrl}${urlSegment}` : "";
    setFullUrl(newUrl);
    onUrlChange(newUrl);
  }, [baseUrl, urlSegment, onUrlChange]);

  useEffect(() => {
    setTempBaseUrl(baseUrl);
  }, [baseUrl, isSettingsOpen]);

  const handleRefresh = () => {
    onUrlChange(fullUrl);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openInNewTab = () => {
    if (fullUrl) {
      window.open(fullUrl, "_blank");
    }
  };

  const handleSaveBaseUrl = () => {
    setBaseUrl(tempBaseUrl);
    setIsSettingsOpen(false);
  };

  return (
    <>
      <div className="space-y-4 sm:space-y-6">
        {/* BASE URL */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between">
            <label
              htmlFor="baseUrl"
              className="text-base font-medium sm:text-lg"
            >
              Base URL
            </label>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-full sm:h-8 sm:w-8"
              onClick={() => setIsSettingsOpen(true)}
            >
              <FiEdit2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="sr-only">Edit Base URL</span>
            </Button>
          </div>
          <div className="overflow-x-auto rounded-lg border border-border bg-muted/30 p-2 sm:p-3">
            <code className="whitespace-nowrap text-sm sm:text-base">
              {baseUrl}
            </code>
          </div>
        </div>

        {/* URL SEGMENT */}
        <div className="space-y-2 sm:space-y-3">
          <label
            htmlFor="urlSegment"
            className="text-base font-medium sm:text-lg"
          >
            URL Segment
          </label>
          <Input
            id="urlSegment"
            placeholder="Enter URL segment (e.g. folder/filename.jpg)"
            value={urlSegment}
            onChange={(e) => setUrlSegment(e.target.value)}
            className="border-2 p-3 text-sm sm:p-5 sm:text-base"
          />
        </div>

        {fullUrl && (
          <div className="hidden space-y-2 sm:space-y-3 md:block">
            <label
              htmlFor="fullUrl"
              className="text-base font-medium sm:text-lg"
            >
              Full URL
            </label>
            <div className="overflow-x-auto rounded-lg border border-border bg-muted/30 p-2 sm:p-3">
              <code className="break-all text-sm sm:text-base">{fullUrl}</code>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 pt-2 sm:gap-3 sm:pt-4">
          <Button
            variant="outline"
            onClick={handleRefresh}
            className="btn-enhanced btn-icon w-full p-3 text-sm sm:p-5 sm:text-base"
          >
            <FiRefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Refresh</span>
          </Button>

          {fullUrl && (
            <>
              <Button
                variant="outline"
                onClick={openInNewTab}
                className="btn-enhanced btn-icon w-full p-3 text-sm sm:p-5 sm:text-base"
                disabled={!fullUrl}
              >
                <FiExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Open URL</span>
              </Button>

              <Button
                variant="default"
                onClick={copyToClipboard}
                className="btn-enhanced btn-icon w-full p-3 text-sm sm:p-5 sm:text-base"
                disabled={!fullUrl}
              >
                <FiCopy className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>{copied ? "Copied!" : "Copy URL"}</span>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Base URL Edit Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="max-w-[90vw] p-4 sm:max-w-[550px] sm:p-6">
          <DialogHeader>
            <DialogTitle className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-xl font-semibold text-transparent sm:text-2xl">
              Edit Base URL
            </DialogTitle>
            <DialogDescription className="pt-2 text-sm sm:text-base">
              Configure your GCP storage base URL. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {/* BASE URL INPUT */}
          <div className="grid gap-4 py-4 sm:gap-6 sm:py-6">
            <div className="grid gap-2 sm:gap-3">
              <Label
                htmlFor="baseUrlEdit"
                className="text-base font-medium sm:text-lg"
              >
                Base URL
              </Label>
              <Input
                id="baseUrlEdit"
                value={tempBaseUrl}
                onChange={(e) => setTempBaseUrl(e.target.value)}
                className="border-2 p-3 text-sm sm:p-5 sm:text-base"
                placeholder="https://storage.googleapis.com/your-bucket/"
              />
              <p className="text-xs text-muted-foreground sm:text-sm">
                This is the base URL for your GCP storage. All file paths will
                be appended to this URL.
              </p>
            </div>
          </div>
          <DialogFooter className="flex-col gap-2 sm:flex-row sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsSettingsOpen(false)}
              className="w-full px-4 py-2 text-sm sm:w-auto sm:px-5 sm:py-3 sm:text-base"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSaveBaseUrl}
              className="btn-enhanced w-full px-4 py-2 text-sm sm:w-auto sm:px-5 sm:py-3 sm:text-base"
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
