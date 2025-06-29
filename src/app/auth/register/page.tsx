"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import Header from "../_components/Header";
import InputFieldWithFeedback from "../_components/InputFieldWithFeedback";
import SubmitButton from "@/components/SubmitButton";

import { useSignup } from "@/hooks/useSignup";
import { PATH } from "@/constants/path";
import { MemberData, TEAM } from "@/constants/team";
import { PART_LABEL, TEAM_LABEL } from "@/constants/team.label";
import { User } from "@/types/user";
import {
  validateLoginId,
  validateEmail,
  validatePassword,
} from "@/utils/validators";

const Register = () => {
  const { mutate: signup, isPending } = useSignup();
  const [user, setUser] = useState({
    loginId: "",
    password: "",
    email: "",
    team: "",
    part: "",
    username: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [teamMember, setTeamMember] = useState<MemberData[]>([]);

  useEffect(() => {
    if (errorMessage) setErrorMessage("");
  }, [user.loginId, user.email]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const targetName = e.target.name;
    const targetValue = e.target.value;
    if (targetName === "part/username") {
      const [part, name] = targetValue.split("/");
      setUser((prev) => ({ ...prev, part: part, username: name }));
    } else {
      setUser((prev) => ({
        ...prev,
        [targetName]: targetValue,
      }));
    }
  };

  const [isValidId, idMsg] = validateLoginId(user.loginId, errorMessage);
  const [isValidPassword, passwordMsg] = validatePassword(user.password);
  const [isValidEmail, emailMsg] = validateEmail(user.email, errorMessage);

  useEffect(() => {
    //team이 정해지면
    const team = TEAM.find((team_) => team_?.code === user.team);
    if (!user.team || !team) return;

    setTeamMember(team.members);
  }, [user.team]);

  const submitSignUpForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !user.loginId ||
      !user.password ||
      !user.email ||
      !user.team ||
      !user.part ||
      !user.username
    ) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (user.password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!isValidEmail) {
      alert("유효한 이메일을 입력해주세요.");
      return;
    }
    signup(user as User, {
      onError: (error: unknown) => {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        }
      },
    });
  };

  return (
    <div className="flex h-full flex-col">
      <Header>회원가입</Header>
      <form
        onSubmit={submitSignUpForm}
        className="flex flex-1 flex-col justify-between md:min-w-3xl md:self-center"
      >
        <div>
          <InputFieldWithFeedback
            label="아이디"
            name="loginId"
            placeholder="아이디를 입력해주세요"
            value={user.loginId}
            onChange={handleChange}
            isValid={isValidId}
            message={user.loginId ? idMsg : " "}
          />
          <InputFieldWithFeedback
            label="비밀번호"
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            value={user.password}
            onChange={handleChange}
            isValid={isValidPassword}
            message={user.password ? passwordMsg : " "}
          />
          <InputFieldWithFeedback
            label="비밀번호 확인"
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호를 다시 입력해주세요"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            isValid={confirmPassword === user.password}
            message={
              confirmPassword
                ? confirmPassword === user.password
                  ? "비밀번호가 일치합니다."
                  : "비밀번호가 일치하지 않습니다."
                : ""
            }
          />
          <InputFieldWithFeedback
            label="이메일"
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요."
            value={user.email}
            onChange={handleChange}
            isValid={isValidEmail}
            message={user.email ? emailMsg : " "}
          />

          <div className="flex">
            <div className="p-4 md:flex-1/3">
              <div className="font-caption-1 text-gray600">팀</div>
              <select
                name="team"
                value={user.team}
                onChange={handleChange}
                className="font-headline-1 border-b-gray100 w-full py-[7px] outline-0"
              >
                <option value="">팀 선택</option>
                {Object.entries(TEAM_LABEL).map(([code, label]) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 p-4 md:flex-2/3">
              <div className="font-caption-1 text-gray600">파트/이름</div>
              <select
                name="part/username"
                value={`${user.part}/${user.username}`}
                onChange={handleChange}
                className="font-headline-1 border-b-gray100 w-full py-[7px] outline-0"
              >
                <option>팀원 선택</option>
                {user.team &&
                  teamMember.map((member) => (
                    <option
                      key={member.name}
                      value={`${member.part}/${member.name}`}
                    >
                      {`${PART_LABEL[member.part]}/${member.name}`}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <Link href={PATH.LOGIN} className="self-end px-4">
            <span className="text-gray600">이미 계정이 있으신가요? </span>
            <span className="text-main">로그인 하러가기</span>
          </Link>

          <SubmitButton
            isActive={
              !!user.loginId &&
              !!user.password &&
              !!confirmPassword &&
              user.password === confirmPassword &&
              isValidId &&
              isValidPassword &&
              isValidEmail &&
              !!user.team &&
              !!user.part &&
              !!user.username &&
              !isPending
            }
          >
            {isPending ? "가입 중..." : "가입하기"}
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default Register;
