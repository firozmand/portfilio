"use client";
import React from "react";

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: any) {
  const base =
    "inline-flex items-center justify-center px-4 py-2 rounded-xl font-medium transition shadow-[var(--shadow-soft)]";
  const variants: Record<string, string> = {
    primary:
      "bg-[color-mix(in_srgb,var(--color-primary)_90%,transparent)] text-[#02121f] hover:brightness-105",
    secondary:
      "bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)]",
    destructive: "bg-red-600 text-white hover:bg-red-500",
  };

  return (
    <button
      className={`${base} ${
        variants[variant] || variants.primary
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
