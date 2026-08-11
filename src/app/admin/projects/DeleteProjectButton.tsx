"use client";

import { deleteProject } from "@/actions/admin";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminConfirmDialog from "@/components/AdminConfirmDialog";

export default function DeleteProjectButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setLoading(true);
    setError("");

    try {
      const result = await deleteProject(id);
      if (result.error) {
        setError(result.error);
        return false;
      }

      router.refresh();
      return true;
    } catch (deleteError) {
      console.error("Project deletion failed:", deleteError);
      setError("Unable to delete the project. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => {
          setError("");
          setShowConfirm(true);
        }}
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
        error={error}
      />
    </>
  );
}
