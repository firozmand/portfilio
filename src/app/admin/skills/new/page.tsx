import SkillForm from "../SkillForm";

export default function NewSkillPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-[var(--admin-text)] mb-8">
        Add New Skill
      </h1>

      <div className="admin-card p-6">
        <SkillForm />
      </div>
    </div>
  );
}
