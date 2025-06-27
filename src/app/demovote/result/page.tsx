"use client";

import React, { useEffect } from "react";
import Header from "@/components/Header";
import { useState } from "react";

const Result = () => {
  const [rankedTeams, setRankedTeams] = useState<string[]>([]);
  const accessToken = localStorage.getItem("accessToken");

  const NEXT_PUBLIC_API_URLS = {
    VoteItems: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/vote/DEMODAY/results`,
  };

  const fetchVoteItems = async () => {
    const response = await fetch(NEXT_PUBLIC_API_URLS.VoteItems, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`서버 오류: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    const sorted = data.result.sort(
      (a: { voteCount: number }, b: { voteCount: number }) =>
        b.voteCount - a.voteCount,
    );

    return sorted as {
      voteItemId: number;
      subject: string;
      voteCount: number;
    }[];
  };

  useEffect(() => {
    const getVoteItems = async () => {
      try {
        const items = await fetchVoteItems();
        setRankedTeams(items.map((item) => item.subject));
      } catch (error) {
        console.error("투표 결과를 불러오는 중 오류 발생:", error);
      }
    };
    getVoteItems();
  }, []);

  return (
    <div className="flex h-full flex-col text-black">
      <Header>데모데이 투표</Header>
      <div className="mx-auto box-border w-full max-w-[345px] rounded-full bg-white px-6 py-2 text-center text-[12px] font-semibold text-[#00AF8F] shadow-sm">
        CEOS 21기 데모데이 최고의 1팀을 투표해주세요.
      </div>

      <div className="flex flex-col gap-3 p-8">
        {rankedTeams.map((name, index) => {
          const isFirst = index === 0;

          return (
            <div
              key={name}
              className="mx-auto flex max-w-[350px] min-w-[280px] items-center gap-4"
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-bold ${
                  isFirst
                    ? "border-[#00AF8F] bg-white text-[#00AF8F]"
                    : "border-gray-200 bg-gray-100 text-gray-500"
                }`}
              >
                {index + 1}
              </div>

              <div className="flex flex-1 items-center justify-between rounded-[10px] bg-white px-4 py-6 shadow-sm">
                <div
                  className={`text-sm font-semibold ${
                    isFirst ? "text-black" : "text-gray-400"
                  }`}
                >
                  {name}
                </div>

                {isFirst && <div className="text-xl text-[#00AF8F]">👑</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Result;
