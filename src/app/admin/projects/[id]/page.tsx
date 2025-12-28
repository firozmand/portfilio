import { getProjectById } from "@/lib/data";
import { notFound } from "next/navigation";
import ProjectForm from "../ProjectForm";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-[var(--admin-text)] mb-8">
        Edit Project
      </h1>

      <div className="admin-card p-6">
        <ProjectForm project={project} />
      </div>
    </div>
  );
}
