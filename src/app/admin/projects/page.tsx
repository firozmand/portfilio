import { getAllProjects } from "@/lib/data";
import Link from "next/link";
import DeleteProjectButton from "./DeleteProjectButton";
import type { Project } from "@prisma/client";

export default async function ProjectsPage() {
  const projects: (Omit<Project, "techStack"> & { techStack: string[] })[] = await getAllProjects();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[var(--admin-text)]">
          Projects Management
        </h1>
        <Link href="/admin/projects/new" className="admin-button primary">
          Add New Project
        </Link>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Order</th>
            <th>Visible</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>
                <div className="font-medium text-[var(--admin-text)]">
                  {project.title}
                </div>
              </td>
              <td className="text-[var(--admin-text-secondary)]">
                {project.order}
              </td>
              <td>
                <span
                  className={`admin-badge ${
                    project.isVisible ? "bg-green-500/20 text-green-400" : ""
                  }`}
                >
                  {project.isVisible ? "Yes" : "No"}
                </span>
              </td>
              <td className="space-x-2">
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="text-green-400 hover:text-green-300"
                >
                  Edit
                </Link>
                <DeleteProjectButton id={project.id} title={project.title} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {projects.length === 0 && (
        <div className="text-center py-12 text-[var(--admin-muted)]">
          No projects yet. Add your first project!
        </div>
      )}
    </div>
  );
}
