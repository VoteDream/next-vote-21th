import { useMutation } from "@tanstack/react-query";
import { signup } from "@/lib/api/signup";
import { useRouter } from "next/navigation";
import { PATH } from "@/constants/path";

export const useSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      router.push(PATH.LOGIN);
    },
  });
};
