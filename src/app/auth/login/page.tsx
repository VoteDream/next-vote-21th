"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PATH } from "@/constants/path";
import { useLogin } from "@/hooks/useLogin";

import Header from "../_components/Header";
import InputFieldWithFeedback from "../_components/InputFieldWithFeedback";
import SubmitButton from "@/components/SubmitButton";
import { ERROR_MESSAGE } from "@/constants/error-message";

const Login = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorState, setErrorState] = useState({
    isUserIdValid: true,
    isPasswordValid: true,
  });

  useEffect(() => {
    if (errorMessage === ERROR_MESSAGE.ID_INVALID)
      return setErrorState({ isUserIdValid: false, isPasswordValid: true });

    if (errorMessage === ERROR_MESSAGE.PASSWORD_INVALID)
      return setErrorState({ isUserIdValid: true, isPasswordValid: false });
  }, [errorMessage]);

  const { mutate: login, isPending } = useLogin();
  const submitLoginForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loginId || !password) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    login(
      { loginId, password },
      {
        onError: (error: unknown) => {
          if (error instanceof Error) {
            setErrorMessage(error.message);
          }
        },
      },
    );
  };

  return (
    <div className="flex h-full flex-col">
      <Header>로그인</Header>

      <form
        onSubmit={submitLoginForm}
        className="flex flex-1 flex-col justify-between md:min-w-3xl md:self-center"
      >
        <div className="flex flex-col">
          <InputFieldWithFeedback
            label="아이디"
            name="id"
            placeholder="아이디를 입력해주세요"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            isValid={errorState.isUserIdValid}
            message={errorState.isUserIdValid ? "" : errorMessage}
          />

          <InputFieldWithFeedback
            label="비밀번호"
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isValid={errorState.isPasswordValid}
            message={errorState.isPasswordValid ? " " : errorMessage}
          />

          <Link href={PATH.REGISTER} className="self-end px-4">
            <span className="text-gray600">계정이 없으신가요? </span>
            <span className="text-main">회원가입 하러가기</span>
          </Link>
        </div>

        <SubmitButton isActive={!!loginId && !!password && !isPending}>
          {isPending ? "로그인 중..." : "로그인 하기"}
        </SubmitButton>
      </form>
    </div>
  );
};

export default Login;
