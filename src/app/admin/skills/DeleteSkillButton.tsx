"use client";

import { deleteSkill } from "@/actions/admin";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminConfirmDialog from "@/components/AdminConfirmDialog";

export default function DeleteSkillButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setLoading(true);
    setError("");

    try {
      const result = await deleteSkill(id);
      if (result.error) {
        setError(result.error);
        return false;
      }

      router.refresh();
      return true;
    } catch (deleteError) {
      console.error("Skill deletion failed:", deleteError);
      setError("Unable to delete the skill. Please try again.");
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
        title="Delete Skill"
        message={`Are you sure you want to delete "${name}"? This action cannot be undone.`}
        confirmText="Delete Skill"
        type="danger"
        loading={loading}
        error={error}
      />
    </>
  );
}
