import React from "react";

export default function GlassCard({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`glass-card p-6 rounded-2xl ${className}`} {...props}>
      {children}
    </div>
  );
}
