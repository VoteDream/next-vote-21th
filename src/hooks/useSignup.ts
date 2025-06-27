import { useMutation } from "@tanstack/react-query";
import { signup } from "@/lib/api/signup";
import { useRouter } from "next/navigation";
import { PATH } from "@/constants/path";

export const useSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      console.log("회원가입 성공 ✅");
      console.log("응답 메시지:", data.message);
      router.push(PATH.LOGIN);
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error("회원가입 실패 ❌", error.message);
      } else {
        console.error("회원가입 실패 ❌ 알 수 없는 에러 발생");
      }
    },
  });
};
