"use client";

import { updateProfile, updateAdminCredentials } from "@/actions/admin";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

type ProfileFormProps = {
  profile: {
    fullName: string;
    shortBio: string;
    aboutMe: string;
    email: string;
    resumeUrl: string | null;
  } | null;
};

export default function ProfileForm({ profile }: ProfileFormProps) {
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
    const result = await updateProfile(formData);

    if (result.error) {
      setMessage({ type: "error", text: result.error });
    } else {
      setMessage({ type: "success", text: "Profile updated successfully!" });
    }
    setLoading(false);
  }

  // Credentials form state
  const [credLoading, setCredLoading] = useState(false);
  const [credMessage, setCredMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  async function handleCredentialsSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCredLoading(true);
    setCredMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await updateAdminCredentials(formData);

    if (result.error) {
      setCredMessage({ type: "error", text: result.error });
    } else {
      setCredMessage({
        type: "success",
        text: "Credentials updated successfully!",
      });
      (e.currentTarget as HTMLFormElement).reset();
    }

    setCredLoading(false);
  }

  return (
    <>
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
            <label htmlFor="fullName" className="admin-label">
              Full name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              defaultValue={profile?.fullName || ""}
              required
              className="admin-input"
            />
          </div>

          <div>
            <label htmlFor="email" className="admin-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={profile?.email || ""}
              required
              className="admin-input"
            />
          </div>
        </div>

        <div>
          <label htmlFor="shortBio" className="admin-label">
            Short bio
          </label>
          <input
            type="text"
            id="shortBio"
            name="shortBio"
            defaultValue={profile?.shortBio || ""}
            required
            className="admin-input"
          />
          <p className="admin-helper">One line describing your focus.</p>
        </div>

        <div>
          <label htmlFor="aboutMe" className="admin-label">
            About me
          </label>
          <textarea
            id="aboutMe"
            name="aboutMe"
            rows={6}
            defaultValue={profile?.aboutMe || ""}
            required
            className="admin-textarea"
          />
          <p className="admin-helper">
            Use paragraphs for clarity; Markdown-friendly.
          </p>
        </div>

        <div>
          <label htmlFor="resumeUrl" className="admin-label">
            Resume URL (optional)
          </label>
          <input
            type="url"
            id="resumeUrl"
            name="resumeUrl"
            defaultValue={profile?.resumeUrl || ""}
            className="admin-input"
            placeholder="https://..."
          />
          <p className="admin-helper mt-2">
            Or upload a resume file (PDF/DOCX)
          </p>
          <input
            type="file"
            name="resumeFile"
            accept=".pdf,.doc,.docx"
            className="mt-2"
          />
          {profile?.resumeUrl && (
            <p className="admin-helper mt-2">
              Current resume:{" "}
              <a
                href={profile.resumeUrl}
                className="text-green-400 hover:underline"
              >
                Download
              </a>
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="admin-helper">
            Changes sync instantly to your public profile.
          </p>
          <button
            type="submit"
            disabled={loading}
            className="admin-button primary w-full sm:w-auto"
          >
            {loading ? "Saving..." : "Save profile"}
          </button>
        </div>
      </form>

      <div className="mt-10">
        <h3 className="text-lg font-semibold text-[var(--admin-text)] mb-4">
          Security & Credentials
        </h3>
        <form
          onSubmit={handleCredentialsSubmit}
          className="space-y-4 admin-card p-6"
        >
          {credMessage && (
            <div
              className={`admin-alert ${
                credMessage.type === "success" ? "success" : "error"
              }`}
            >
              {credMessage.text}
            </div>
          )}

          <div>
            <label htmlFor="currentPassword" className="admin-label">
              Current password
            </label>
            <div className="relative">
              <input
                id="currentPassword"
                name="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                required
                className="admin-input pr-12"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword((s) => !s)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-[var(--admin-muted)] hover:text-[var(--admin-text)] transition-colors"
                aria-label={
                  showCurrentPassword
                    ? "Hide current password"
                    : "Show current password"
                }
              >
                {showCurrentPassword ? (
                  <FiEyeOff className="w-5 h-5" />
                ) : (
                  <FiEye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="newEmail" className="admin-label">
              New email (optional)
            </label>
            <input
              id="newEmail"
              name="newEmail"
              type="email"
              className="admin-input"
              placeholder={profile?.email || ""}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="newPassword" className="admin-label">
                New password (optional)
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                className="admin-input"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="admin-label">
                Confirm new password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="admin-input"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={credLoading}
              className="admin-button primary"
            >
              {credLoading ? "Updating..." : "Update credentials"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
