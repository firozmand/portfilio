import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import SkillForm from "../SkillForm";

export default async function EditSkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const skill = await prisma.skill.findUnique({
    where: { id },
  });

  if (!skill) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-[var(--admin-text)] mb-8">
        Edit Skill
      </h1>

      <div className="admin-card p-6">
        <SkillForm skill={skill} />
      </div>
    </div>
  );
}
