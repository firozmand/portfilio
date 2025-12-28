import { getSkills } from "@/lib/data";
import Link from "next/link";
import DeleteSkillButton from "./DeleteSkillButton";
import type { Skill } from "@prisma/client";

export default async function SkillsPage() {
  const skills: Skill[] = await getSkills();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[var(--admin-text)]">
          Skills Management
        </h1>
        <Link href="/admin/skills/new" className="admin-button primary">
          Add New Skill
        </Link>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Category</th>
            <th>Order</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill) => (
            <tr key={skill.id}>
              <td>
                <div className="font-medium text-[var(--admin-text)]">
                  {skill.name}
                </div>
              </td>
              <td>
                <div className="flex items-center">
                  <div className="w-24 bg-[var(--admin-border)] rounded-full h-2 mr-2">
                    <div
                      className="bg-green-400 h-2 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <span className="text-sm text-[var(--admin-text-secondary)]">
                    {skill.level}%
                  </span>
                </div>
              </td>
              <td className="text-[var(--admin-text-secondary)]">
                {skill.category || "-"}
              </td>
              <td className="text-[var(--admin-text-secondary)]">
                {skill.order}
              </td>
              <td className="space-x-2">
                <Link
                  href={`/admin/skills/${skill.id}`}
                  className="text-green-400 hover:text-green-300"
                >
                  Edit
                </Link>
                <DeleteSkillButton id={skill.id} name={skill.name} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {skills.length === 0 && (
        <div className="text-center py-12 text-[var(--admin-muted)]">
          No skills yet. Add your first skill!
        </div>
      )}
    </div>
  );
}
