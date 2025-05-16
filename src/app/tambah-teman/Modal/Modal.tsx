import { Card, CardHeader, CardTitle, CardContent } from "../components/card";
import { Button } from "../components/button";
import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: React.ReactNode;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "default" | "destructive";
  disabled?: boolean;
}

export function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  variant = "default",
  disabled = false,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-md rounded-lg bg-white">
        <CardHeader>
          <CardTitle className="text-slate-900 text-4xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-900 mb-4">{message}</p>
          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={onCancel}
              className="text-slate-900 border-slate-900 hover:bg-slate-100 flex-1 py-2"
              disabled={disabled}
            >
              {cancelText}
            </Button>
            <Button
              onClick={onConfirm}
              className={`${
                variant === "destructive"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-slate-900 hover:bg-slate-800"
              } text-white flex-1 py-2`}
              disabled={disabled}
            >
              {confirmText}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
