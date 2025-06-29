import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { login } from "@/lib/api/login";
import { useUserStore } from "@/stores/useUserStore";

export const useLogin = () => {
  const router = useRouter();
  const { setUser } = useUserStore();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const { user, accessToken } = data.result;
      setUser({ ...user, accessToken });
      // localStorage.setItem("accessToken", accessToken);
      router.push("/");
    },
  });
};
