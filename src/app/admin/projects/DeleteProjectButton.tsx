"use client";

import { deleteProject } from "@/actions/admin";
import { useState } from "react";
import AdminConfirmDialog from "@/components/AdminConfirmDialog";

export default function DeleteProjectButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleDelete() {
    setLoading(true);
    await deleteProject(id);
    setLoading(false);
  }

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        disabled={loading}
        className="admin-button danger text-sm"
      >
        {loading ? "Deleting..." : "Delete"}
      </button>

      <AdminConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Project"
        message={`Are you sure you want to delete "${title}"? This action cannot be undone.`}
        confirmText="Delete Project"
        type="danger"
        loading={loading}
      />
    </>
  );
}
