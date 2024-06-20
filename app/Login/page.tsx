"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Login: React.FC = () => {
  const router = useRouter();

  const handleLogin = () => {
    const clientKey = process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY;
    const redirectUri = process.env.NEXT_PUBLIC_TIKTOK_REDIRECT_URI;
    const scope = "user.info.basic";
    const responseType = "code";

    if (clientKey && redirectUri) {
      console.log("Client Key and Redirect URI present");
      const authUrl = `https://www.tiktok.com/v2/auth/authorize/?client_key=${clientKey}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&response_type=${responseType}&scope=${scope}`;
      router.push(authUrl);
    } else {
      console.error("Client Key or Redirect URI is missing");
    }
  };

  return (
    <div>
      <h1>Login with TikTok</h1>
      <button onClick={handleLogin}>Login with TikTok</button>
    </div>
  );
};

export default Login;
