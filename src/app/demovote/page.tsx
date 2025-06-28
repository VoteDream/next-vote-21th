"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import SubmitButton from "@/components/SubmitButton";
import { useRouter } from "next/navigation";
import { TEAM_LABEL } from "@/constants/team.label";
import { TEAM_CODE_TYPE } from "@/constants/team.code";

interface VoteItem {
  voteItemId: number;
  subject: string;
  voteCount: number;
}

const Vote = () => {
  const [rankedTeams, setRankedTeams] = useState<VoteItem[]>([]);

  const NEXT_PUBLIC_API_URLS = {
    VoteItems: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/vote/DEMODAY/items`,
    Vote: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/vote/DEMODAY/vote`,
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

    // result만 반환
    return data.result as {
      voteItemId: number;
      subject: string;
      voteCount: number;
    }[];
  };
  useEffect(() => {
    const getVoteItems = async () => {
      try {
        const items = await fetchVoteItems();
        setRankedTeams(items);
      } catch (error) {
        console.error("투표 항목을 불러오는 중 오류 발생:", error);
      }
    };

    getVoteItems();
  }, []);

  const [selected, setSelected] = useState<number | null>(null);
  const router = useRouter();
  const accessToken = localStorage.getItem("accessToken");

  const submitVote = async () => {
    if (!selected) return;
    const response = await fetch(NEXT_PUBLIC_API_URLS.Vote, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      body: JSON.stringify({ voteId: 1, voteItemId: selected }),
    });
    if (!response.ok) {
      await response.text();
      alert("이미 투표를 하셨습니다.");
      router.replace("/demovote/result");
    }
    const data = await response.json();
    if (data.isSuccess) {
      alert("투표가 성공적으로 제출되었습니다!");
      setSelected(null);
      router.replace("/demovote/result");
    } else {
      alert("투표 제출에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleSelect = (voteId: number) => {
    setSelected(voteId);
  };

  return (
    <div className="flex h-full flex-col text-black">
      <Header>데모데이 투표</Header>
      <div className="mx-auto box-border w-full max-w-[345px] rounded-full bg-white px-6 py-2 text-center text-[12px] font-semibold text-[#00AF8F] shadow-sm">
        CEOS 21기 데모데이 최고의 1팀을 투표해주세요.
      </div>

      <form
        className="flex flex-1 flex-col justify-between"
        onSubmit={(e) => {
          e.preventDefault();
          submitVote();
        }}
      >
        <div className="grid grid-cols-1 gap-4 p-4">
          {rankedTeams.map((item) => {
            const isActive = selected === item.voteItemId;
            return (
              <button
                type="button"
                key={item.voteItemId}
                onClick={() => handleSelect(item.voteItemId)}
                className={`mx-auto h-[56px] max-w-[350px] min-w-[350px] rounded-[6px] p-4 text-center text-sm font-semibold shadow-sm transition duration-200 ease-in-out ${
                  isActive
                    ? "bg-[#00AF8F] text-white shadow-md"
                    : "bg-white text-black hover:bg-[#00AF8F] hover:text-white hover:shadow-md"
                }`}
              >
                {TEAM_LABEL[item.subject as TEAM_CODE_TYPE]}
                <span
                  className={`mx-1 text-xs text-gray-500 ${
                    isActive
                      ? "text-white"
                      : "text-gray-500 group-hover:text-white"
                  }`}
                >
                  투표 {item.voteCount}표
                </span>
              </button>
            );
          })}
        </div>

        <SubmitButton isActive={selected !== null}>투표하기</SubmitButton>
      </form>
    </div>
  );
};

export default Vote;
