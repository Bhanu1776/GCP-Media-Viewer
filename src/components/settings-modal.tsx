"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSettingsStore } from "@/lib/store";
import { useState } from "react";
import { FiSettings } from "react-icons/fi";

export function SettingsModal() {
  const { baseUrl, setBaseUrl } = useSettingsStore();
  const [tempBaseUrl, setTempBaseUrl] = useState(baseUrl);
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    setBaseUrl(tempBaseUrl);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="size-10 rounded-full bg-background/80 shadow-sm backdrop-blur-sm"
        >
          <FiSettings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-2xl font-semibold text-transparent">
            Settings
          </DialogTitle>
          <DialogDescription className="pt-2 text-base">
            Configure your GCP storage settings. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-6">
          <div className="grid gap-3">
            <Label htmlFor="baseUrl" className="text-lg font-medium">
              Base URL
            </Label>
            <Input
              id="baseUrl"
              value={tempBaseUrl}
              onChange={(e) => setTempBaseUrl(e.target.value)}
              className="border-2 p-5 text-base"
              placeholder="https://storage.googleapis.com/your-bucket/"
            />
            <p className="text-sm text-muted-foreground">
              This is the base URL for your GCP storage. All file paths will be
              appended to this URL.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="px-5 py-5 text-base"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSave}
            className="btn-enhanced px-5 py-5 text-base"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
