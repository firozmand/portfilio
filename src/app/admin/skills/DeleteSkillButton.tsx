"use client";

import { deleteSkill } from "@/actions/admin";
import { useState } from "react";
import AdminConfirmDialog from "@/components/AdminConfirmDialog";

export default function DeleteSkillButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleDelete() {
    setLoading(true);
    await deleteSkill(id);
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
        title="Delete Skill"
        message={`Are you sure you want to delete "${name}"? This action cannot be undone.`}
        confirmText="Delete Skill"
        type="danger"
        loading={loading}
      />
    </>
  );
}
