import { getProfile } from "@/lib/data";
import ProfileForm from "./ProfileForm";

export default async function ProfilePage() {
  const profile = await getProfile();

  return (
    <div>
      <h1 className="text-3xl font-bold text-[var(--admin-text)] mb-8">
        Profile Management
      </h1>

      <div className="admin-card p-6">
        <ProfileForm profile={profile} />
      </div>
    </div>
  );
}
