"use client";

import * as Toast from "@radix-ui/react-toast";
import { createContext, useContext, useState, useCallback } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error";
type ToastMessage = { id: number; message: string; type: ToastType };

const ToastContext = createContext<{
  toast: (msg: string, type?: ToastType) => void;
}>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function Toaster({ children }: { children?: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const counter = useState(0);

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      <Toast.Provider swipeDirection="right">
        {children}
        {toasts.map(({ id, message, type }) => (
          <Toast.Root
            key={id}
            open
            onOpenChange={() => setToasts((prev) => prev.filter((t) => t.id !== id))}
            className={cn(
              "flex items-start gap-3 p-4 rounded-xl shadow-lg border max-w-sm",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[swipe=end]:animate-out data-[state=closed]:fade-out-80",
              "data-[state=open]:slide-in-from-bottom-4",
              type === "success"
                ? "bg-white border-slate-200 text-slate-900"
                : "bg-red-50 border-red-200 text-red-900"
            )}
          >
            {type === "success" ? (
              <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
            )}
            <Toast.Description className="text-sm flex-1">{message}</Toast.Description>
            <Toast.Action altText="Dismiss" asChild>
              <button className="shrink-0 text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </Toast.Action>
          </Toast.Root>
        ))}
        <Toast.Viewport className="fixed bottom-4 right-4 flex flex-col gap-2 z-50 w-full max-w-sm" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
}
