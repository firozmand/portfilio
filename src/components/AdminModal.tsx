"use client";

import { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiAlertTriangle,
  FiCheckCircle,
  FiInfo,
  FiAlertCircle,
} from "react-icons/fi";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  type?: "default" | "danger" | "success" | "warning" | "info";
  size?: "sm" | "md" | "lg";
}

export default function AdminModal({
  isOpen,
  onClose,
  title,
  children,
  type = "default",
  size = "md",
}: AdminModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const getIcon = () => {
    switch (type) {
      case "danger":
        return <FiAlertTriangle className="w-6 h-6 text-red-400" />;
      case "success":
        return <FiCheckCircle className="w-6 h-6 text-green-400" />;
      case "warning":
        return <FiAlertCircle className="w-6 h-6 text-yellow-400" />;
      case "info":
        return <FiInfo className="w-6 h-6 text-blue-400" />;
      default:
        return null;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "max-w-md";
      case "lg":
        return "max-w-2xl";
      default:
        return "max-w-lg";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`w-full ${getSizeClasses()} admin-card p-6 relative`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getIcon()}
                  <h3 className="text-lg font-semibold text-[var(--admin-text)]">
                    {title}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg hover:bg-[var(--admin-surface)] text-[var(--admin-muted)] hover:text-[var(--admin-text)] transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="text-[var(--admin-text-secondary)]">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
