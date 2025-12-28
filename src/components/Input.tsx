"use client";
import React from "react";

export default function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] shadow-[var(--shadow-soft)] focus:border-[color-mix(in_srgb,var(--color-primary)_40%,var(--border-strong))] focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-primary)_30%,transparent)] ${
        props.className || ""
      }`}
    />
  );
}
