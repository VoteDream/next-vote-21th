"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import SubmitButton from "@/components/SubmitButton";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";

interface Candidate {
  subject: string;
  voteItemId: number;
}

const Vote = () => {
  const { user } = useUserStore();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  const NEXT_PUBLIC_API_URLS = {
    VoteItems: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/vote/PARTLEADER/items`,
    Vote: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/vote/PARTLEADER/vote`,
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
    return data.result; // [[...], [...]]
  };

  useEffect(() => {
    const getVoteItems = async () => {
      try {
        if (!user || !user.part) return;

        const items = await fetchVoteItems();

        const index =
          user.part === "FRONTEND" ? 1 : user.part === "BACKEND" ? 0 : -1;

        if (index === -1) {
          console.warn("알 수 없는 파트 코드:", user.part);
          return;
        }

        const myCandidates = items[index];
        setCandidates(Array.isArray(myCandidates) ? myCandidates : []);
      } catch (error) {
        console.error("투표 항목을 불러오는 중 오류 발생:", error);
        setCandidates([]); // fallback
      }
    };

    getVoteItems();
  }, [user]);

  const router = useRouter();
  const accessToken = localStorage.getItem("accessToken");

  const submitVote = async () => {
    if (!selected) return;
    console.log("선택된 후보:", selected);
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
      const errorText = await response.text();
      throw new Error(`투표 제출 오류: ${response.status} - ${errorText}`);
    }
    const data = await response.json();
    if (data.isSuccess) {
      alert("투표가 성공적으로 제출되었습니다!");
      router.replace("/vote/result");
    } else {
      alert("투표 제출에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleSelect = (voteItemId: number) => {
    setSelected(voteItemId);
  };

  return (
    <div className="flex h-full flex-col text-black">
      <Header>파트장 투표</Header>

      <div className="mx-auto box-border w-full max-w-[345px] rounded-full bg-white px-6 py-2 text-center text-[12px] font-semibold text-[#00AF8F] shadow-sm">
        CEOS 22기 {user?.part === "FRONTEND" ? "프론트엔드" : "백엔드"} 파트장
        1명을 투표해주세요.
      </div>

      <form
        className="flex flex-1 flex-col justify-between"
        onSubmit={(e) => {
          e.preventDefault();
          submitVote();
        }}
      >
        <div className="mx-auto grid grid-cols-2 gap-4 p-4">
          {candidates.map((c) => {
            const isActive = selected === c.voteItemId;
            return (
              <button
                type="button"
                key={c.voteItemId}
                onClick={() => handleSelect(c.voteItemId)}
                className={`group flex h-[66px] max-w-[345px] flex-row items-center gap-2 rounded-[4px] p-4 shadow transition duration-200 ease-in-out ${
                  isActive
                    ? "scale-[1.01] bg-[#00AF8F] text-white shadow-lg"
                    : "bg-white text-black hover:scale-[1.01] hover:bg-[#00AF8F] hover:text-white hover:shadow-lg"
                }`}
              >
                <div
                  className={`font-semibold ${
                    isActive
                      ? "text-white"
                      : "text-black group-hover:text-white"
                  }`}
                >
                  {c.subject}
                </div>
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
