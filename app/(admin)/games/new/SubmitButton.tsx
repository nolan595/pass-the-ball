"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/Button";
import { Loader2 } from "lucide-react";

export function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={disabled || pending} className="flex-1">
      {pending && <Loader2 className="w-4 h-4 animate-spin" />}
      {pending ? "Creating…" : "Create Game"}
    </Button>
  );
}
