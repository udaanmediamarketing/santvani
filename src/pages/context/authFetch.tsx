import { useAuth } from "./AuthContext";

export const useAuthFetch = () => {
  const { token, handleUnauthorized } = useAuth();

  const authFetch = async (
    input: RequestInfo,
    init?: RequestInit
  ): Promise<Response> => {
    const res = await fetch(input, {
      ...init,
      headers: {
        ...(init?.headers || {}),
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (res.status === 401 || res.status === 403) {
      handleUnauthorized();
      throw new Error("Session expired");
    }

    return res;
  };

  return authFetch;
};