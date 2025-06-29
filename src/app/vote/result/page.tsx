"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useUserStore } from "@/stores/useUserStore";
import SubmitButton from "@/components/SubmitButton";
import Link from "next/link";
import { PATH } from "@/constants/path";

interface Candidate {
  voteItemId: number;
  subject: string;
  voteCount: number;
}

const Result = () => {
  const { user } = useUserStore();
  const [rankedCandidates, setRankedCandidates] = useState<Candidate[]>([]);
  const [votesCount, setVotesCount] = useState<number>(0);

  const NEXT_PUBLIC_API_URLS = {
    VoteItems: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/vote/PARTLEADER/results`,
  };

  const fetchVoteItems = async () => {
    const response = await fetch(NEXT_PUBLIC_API_URLS.VoteItems, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`서버 오류: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.result; // 2차원 배열: [[...], [...]]
  };

  useEffect(() => {
    const getVoteItems = async () => {
      try {
        if (!user || !user.part) return;

        const items = await fetchVoteItems();

        const index =
          user.part === "FRONTEND" ? 1 : user.part === "BACKEND" ? 0 : -1;

        if (index === -1) {
          // console.warn("NONE 파트는 결과 대상이 아닙니다.");
          setRankedCandidates([]);
          return;
        }

        const partCandidates = Array.isArray(items[index]) ? items[index] : [];

        const sorted = partCandidates.sort(
          (a: Candidate, b: Candidate) => b.voteCount - a.voteCount,
        );

        setRankedCandidates(sorted);
        setVotesCount(sorted.reduce((sum, item) => sum + item.voteCount, 0));
      } catch {
        // console.error("투표 결과를 불러오는 중 오류 발생:", error);
        setRankedCandidates([]);
      }
    };

    getVoteItems();
  }, [user]);

  const partLabel =
    user?.part === "FRONTEND"
      ? "프론트엔드"
      : user?.part === "BACKEND"
        ? "백엔드"
        : "미정";

  return (
    <div className="flex h-full flex-col text-black">
      <Header>파트장 투표 결과</Header>

      <div className="mx-auto box-border w-full max-w-[345px] rounded-full bg-white px-6 py-2 text-center text-[12px] font-semibold text-[#00AF8F] shadow-sm">
        CEOS 22기 {partLabel} 파트장 투표 결과입니다.
      </div>

      <div className="flex flex-1 flex-col justify-between p-8">
        <div className="flex flex-col gap-3 p-4">
          {rankedCandidates.map((c, index) => {
            const isFirst =
              index === 0 || c.voteCount === rankedCandidates[0].voteCount;
            return (
              <div
                key={c.voteItemId}
                className="mx-auto flex max-w-[350px] min-w-[280px] items-center gap-4"
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-bold ${
                    isFirst
                      ? "border-[#00AF8F] bg-white text-[#00AF8F]"
                      : "border-gray-200 bg-gray-100 text-gray-500"
                  }`}
                >
                  {isFirst ? 1 : index + 1}
                </div>
                <div className="flex flex-1 items-center justify-between rounded-[10px] bg-white p-4 shadow-sm">
                  <div className="flex items-center pb-1.5">
                    <div className="pt-1.5 font-semibold text-black">
                      {c.subject}
                    </div>
                    {isFirst && <div className="text-xl">👑</div>}
                  </div>
                  <div
                    className={`text-sm font-semibold ${
                      isFirst ? "text-[#00AF8F]" : "text-gray-400"
                    }`}
                  >
                    {c.voteCount}표
                    <span className="mx-1 text-xs">
                      득표율 {((c.voteCount / votesCount) * 100).toFixed(1)}%
                    </span>
                  </div>{" "}
                </div>
              </div>
            );
          })}
        </div>
        {user?.isLeaderVoted ? (
          <Link href={PATH.DEMO_RESULT}>
            <SubmitButton isActive={true}>데모데이 결과보러 가기</SubmitButton>
          </Link>
        ) : (
          <Link href={PATH.DEMOVOTE}>
            <SubmitButton isActive={true}>데모데이 투표하러 가기</SubmitButton>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Result;
