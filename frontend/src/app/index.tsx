import { useLazyMeQuery } from "@modules/auth/api/auth.api";
import { useUserContext } from "@modules/auth/context/user.context";
import { getToken } from "@modules/auth/storage/user.storage";
import { Redirect } from "expo-router";
import { useState, useEffect } from "react";


export default function Page() {
  const { token, setUser, setToken } = useUserContext();

  const [getUserData] = useLazyMeQuery();

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const storageToken = await getToken();

      if (token || storageToken) {
        try {
          if (!token && storageToken) {
            const newUser = await getUserData(storageToken).unwrap();
            setUser(newUser);
			setToken(storageToken)
          }

          setAuthenticated(true);
        } catch {
          setAuthenticated(false);
        }
      }

      setLoading(false);
    }

    checkAuth();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Redirect href={authenticated ? "/main" : "/auth"} />
  );
}