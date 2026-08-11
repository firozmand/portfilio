"use client";

import { useState } from "react";

type ProjectMediaProps = {
  title: string;
  thumbnail: string | null;
  url: string | null;
  techStack: string[];
  index: number;
};

const getDomain = (url: string | null) => {
  if (!url) return "Private product";

  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "Product preview";
  }
};

const ProjectMedia = ({
  title,
  thumbnail,
  url,
  techStack,
  index,
}: ProjectMediaProps) => {
  const [imageFailed, setImageFailed] = useState(false);
  const domain = getDomain(url);

  if (thumbnail && !imageFailed) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)]">
        {/* Native img supports user-managed and Vercel Blob URLs without a fragile host allowlist. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnail}
          alt={`${title} website preview`}
          className="h-full w-full object-cover transition duration-500 hover:scale-[1.02]"
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-4 sm:p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,color-mix(in_srgb,var(--color-primary)_22%,transparent),transparent_36%),radial-gradient(circle_at_88%_82%,color-mix(in_srgb,var(--color-secondary)_18%,transparent),transparent_38%)]" />
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(var(--border-subtle)_1px,transparent_1px),linear-gradient(90deg,var(--border-subtle)_1px,transparent_1px)] [background-size:34px_34px]" />

      <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--surface-strong)_90%,transparent)] shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green/80" />
          <span className="ml-2 min-w-0 flex-1 truncate rounded-md border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-1 font-mono text-[10px] text-[var(--text-secondary)] sm:text-xs">
            {domain}
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-between gap-3 p-4 sm:p-6">
          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-green sm:text-xs">
              Project {String(index + 1).padStart(2, "0")}
            </p>
            <p className="max-w-md text-xl font-semibold leading-tight text-[var(--text-primary)] sm:text-3xl">
              {title}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[var(--border-subtle)] bg-[var(--surface)] px-2.5 py-1 text-[10px] text-[var(--text-secondary)] sm:text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectMedia;
