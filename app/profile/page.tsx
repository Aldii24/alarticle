import { getCurrentUser, getUserRoleAdmin } from "@/actions/user.action";
import ProfileDetail from "@/components/ProfileDetail";

const ProfilePage = async () => {

  const user = await getCurrentUser()
  const ADMIN = await getUserRoleAdmin()

  return (
    <div className="md:px-16 px-4 py-10">
      <ProfileDetail user={user} isAdmin={ADMIN?.role === "ADMIN"} />
    </div>
  );
};

export default ProfilePage;
