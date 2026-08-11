"use client";

import AdminModal from "./AdminModal";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => boolean | void | Promise<boolean | void>;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning";
  loading?: boolean;
  error?: string;
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  type = "danger",
  loading = false,
  error,
}: ConfirmDialogProps) {
  const handleConfirm = async () => {
    const confirmed = await onConfirm();
    if (confirmed !== false) onClose();
  };

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      type={type}
      size="sm"
    >
      <p className="mb-6">{message}</p>

      {error && <div className="admin-alert error mb-4">{error}</div>}

      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          disabled={loading}
          className="admin-button ghost"
        >
          {cancelText}
        </button>
        <button
          onClick={handleConfirm}
          disabled={loading}
          className={`admin-button ${type === "danger" ? "danger" : "primary"}`}
        >
          {loading ? "Processing..." : confirmText}
        </button>
      </div>
    </AdminModal>
  );
}
