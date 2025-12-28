import ProjectForm from "../ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-[var(--admin-text)] mb-8">
        Add New Project
      </h1>

      <div className="admin-card p-6">
        <ProjectForm />
      </div>
    </div>
  );
}
