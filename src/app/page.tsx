"use client";

import Link from "next/link";
import { PATH } from "@/constants/path";

import SubmitButton from "@/components/SubmitButton";
import Lottie from "@/components/Lottie";
import VoteButton from "@/components/VoteButton";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect } from "react";
import { fetchVoteStatus } from "@/lib/api/fetchVoteStatus";

export default function Home() {
  const { user, logout, isLoggedIn } = useUserStore();

  useEffect(() => {
    if (!user?.accessToken) return;
    const fetchData = async () => {
      try {
        await fetchVoteStatus();
      } catch (error) {
        console.error("가져오기 실패 ❌", error);
      }
    };

    fetchData();
  }, [user?.accessToken]);

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-1 flex-col items-center justify-around">
        <div className="w-full max-w-3xl">
          <Lottie />
        </div>

        <div
          className={`self-center rounded-2xl bg-white px-6 py-2 ${isLoggedIn ? "text-main" : "text-pink"} text-center`}
        >
          {isLoggedIn ? (
            <div>
              <div className="font-headline-3 text-main">
                {user?.username}님의 투표 상태
              </div>
              <div className="text-black">
                파트장 투표:{" "}
                {user?.isLeaderVoted ? (
                  <span className="text-main">완료</span>
                ) : (
                  <span className="text-pink">미완</span>
                )}
              </div>
              <div className="text-black">
                데모데이 투표:{" "}
                {user?.isDemoVoted ? (
                  <span className="text-main">완료</span>
                ) : (
                  <span className="text-pink">미완</span>
                )}
              </div>
            </div>
          ) : (
            "로그인이 필요합니다."
          )}
        </div>
      </div>

      <div className="md:self-center">
        <div className="flex flex-col md:flex-row">
          <VoteButton
            href={
              isLoggedIn
                ? user?.isLeaderVoted
                  ? PATH.LEADER_RESULT
                  : PATH.VOTE
                : PATH.LOGIN
            }
            label={user?.isLeaderVoted ? "파트장 결과보기" : "파트장 투표하기"}
          />
          <VoteButton
            href={
              isLoggedIn
                ? user?.isDemoVoted
                  ? PATH.DEMO_RESULT
                  : PATH.DEMOVOTE
                : PATH.LOGIN
            }
            label={
              user?.isDemoVoted ? "데모데이 결과보기" : "데모데이 투표하기"
            }
          />
        </div>

        {isLoggedIn ? (
          <div onClick={logout}>
            <SubmitButton isActive={true} isPink={true}>
              로그아웃 하기
            </SubmitButton>
          </div>
        ) : (
          <Link href={PATH.LOGIN}>
            <SubmitButton isActive={true}>로그인 하기</SubmitButton>
          </Link>
        )}
      </div>
    </div>
  );
}
