"use client";

import { createProject, updateProject } from "@/actions/admin";
import { useState } from "react";
import { useRouter } from "next/navigation";

type ProjectFormProps = {
  project?: {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    thumbnail: string | null;
    liveUrl: string | null;
    githubUrl: string | null;
    order: number;
    isVisible: boolean;
  };
};

export default function ProjectForm({ project }: ProjectFormProps) {
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
    const result = project
      ? await updateProject(project.id, formData)
      : await createProject(formData);

    if (result.error) {
      setMessage({ type: "error", text: result.error });
      setLoading(false);
    } else {
      setMessage({
        type: "success",
        text: `Project ${project ? "updated" : "created"} successfully!`,
      });
      setTimeout(() => {
        router.push("/admin/projects");
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
          <label htmlFor="title" className="admin-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={project?.title || ""}
            required
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
            defaultValue={project?.order || 0}
            min="0"
            className="admin-input"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="admin-label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={project?.description || ""}
          required
          className="admin-textarea"
        />
      </div>

      <div>
        <label htmlFor="techStack" className="admin-label">
          Tech Stack (comma-separated)
        </label>
        <input
          type="text"
          id="techStack"
          name="techStack"
          defaultValue={project?.techStack.join(", ") || ""}
          required
          placeholder="React, Next.js, TypeScript"
          className="admin-input"
        />
        <p className="admin-helper">Shown as chips on the public site.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="thumbnail" className="admin-label">
            Thumbnail URL
          </label>
          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            defaultValue={project?.thumbnail || ""}
            placeholder="/project-image.png"
            className="admin-input"
          />
          <p className="admin-helper mt-2">Or upload an image file</p>
          <input
            type="file"
            name="thumbnailFile"
            accept="image/*"
            className="mt-2"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div>
            <label htmlFor="liveUrl" className="admin-label">
              Live URL
            </label>
            <input
              type="url"
              id="liveUrl"
              name="liveUrl"
              defaultValue={project?.liveUrl || ""}
              placeholder="https://example.com"
              className="admin-input"
            />
          </div>
          <div>
            <label htmlFor="githubUrl" className="admin-label">
              GitHub URL
            </label>
            <input
              type="url"
              id="githubUrl"
              name="githubUrl"
              defaultValue={project?.githubUrl || ""}
              placeholder="https://github.com/..."
              className="admin-input"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="isVisible" className="admin-label">
            Visible
          </label>
          <select
            id="isVisible"
            name="isVisible"
            defaultValue={project?.isVisible ? "true" : "false"}
            className="admin-select"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="admin-helper">
          Save to update or create this project entry.
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
            {loading
              ? "Saving..."
              : project
              ? "Update project"
              : "Create project"}
          </button>
        </div>
      </div>
    </form>
  );
}
