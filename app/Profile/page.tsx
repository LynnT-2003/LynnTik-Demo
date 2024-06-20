import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface UserInfo {
  // Define the structure of user info according to TikTok API response
}

const Profile: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const router = useRouter();
  const { accessToken } = router.query;

  useEffect(() => {
    if (accessToken && typeof accessToken === "string") {
      fetch(`/api/user?accessToken=${accessToken}`)
        .then((response) => response.json())
        .then((data) => setUserInfo(data.data))
        .catch((error) => console.error("Error fetching user info:", error));
    }
  }, [accessToken]);

  if (!userInfo) return <div>Loading...</div>;

  return (
    <div>
      <h1>User Profile</h1>
      <pre>{JSON.stringify(userInfo, null, 2)}</pre>
    </div>
  );
};

export default Profile;
