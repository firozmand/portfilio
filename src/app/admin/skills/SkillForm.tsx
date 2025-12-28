"use client";

import { createSkill, updateSkill } from "@/actions/admin";
import { useState } from "react";
import { useRouter } from "next/navigation";

type SkillFormProps = {
  skill?: {
    id: string;
    name: string;
    level: number;
    category: string | null;
    order: number;
  };
};

export default function SkillForm({ skill }: SkillFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = skill
      ? await updateSkill(skill.id, formData)
      : await createSkill(formData);

    if (result.error) {
      setMessage({ type: "error", text: result.error });
      setLoading(false);
    } else {
      setMessage({
        type: "success",
        text: `Skill ${skill ? "updated" : "created"} successfully!`,
      });
      setTimeout(() => {
        router.push("/admin/skills");
      }, 1000);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <div
          className={`admin-alert ${
            message.type === "success" ? "success" : "error"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="admin-label">
            Skill name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={skill?.name || ""}
            required
            className="admin-input"
          />
        </div>

        <div>
          <label htmlFor="level" className="admin-label">
            Level (0-100)
          </label>
          <input
            type="number"
            id="level"
            name="level"
            min="0"
            max="100"
            defaultValue={skill?.level || 50}
            required
            className="admin-input"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="category" className="admin-label">
            Category (optional)
          </label>
          <input
            type="text"
            id="category"
            name="category"
            defaultValue={skill?.category || ""}
            placeholder="Frontend, Backend, Tools"
            className="admin-input"
          />
        </div>

        <div>
          <label htmlFor="order" className="admin-label">
            Order
          </label>
          <input
            type="number"
            id="order"
            name="order"
            defaultValue={skill?.order || 0}
            min="0"
            className="admin-input"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="admin-helper">
          Skills feed the public experience & timeline sections.
        </p>
        <div className="flex w-full sm:w-auto gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="admin-button ghost flex-1 sm:flex-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="admin-button primary flex-1 sm:flex-none"
          >
            {loading ? "Saving..." : skill ? "Update skill" : "Create skill"}
          </button>
        </div>
      </div>
    </form>
  );
}
