"use client";

import React, { useState } from "react";

import Header from "@/components/Header";
import SubmitButton from "@/components/SubmitButton";

const Vote = () => {
  const candidates = [
    { name: "김서연", affiliation: "프로메사" },
    { name: "신수진", affiliation: "하니홈" },
    { name: "김영서", affiliation: "이어드림" },
    { name: "원채영", affiliation: "하니홈" },
    { name: "김철홍", affiliation: "팝업사이클" },
    { name: "이주희", affiliation: "이어드림" },
    { name: "권동욱", affiliation: "프로메사" },
    { name: "최서연", affiliation: "인플루이" },
    { name: "송아영", affiliation: "팝업사이클" },
    { name: "한서정", affiliation: "인플루이" },
  ];

  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (name: string) => {
    setSelected(name);
  };

  return (
    <div className="flex h-full flex-col text-black">
      <Header>프론트엔드 파트장 투표</Header>

      <div className="mx-auto box-border w-full max-w-[345px] rounded-full bg-white px-6 py-2 text-center text-[12px] font-semibold text-[#00AF8F] shadow-sm">
        CEOS 22기 프론트엔드 파트장 1명을 투표해주세요.
      </div>

      <form className="flex flex-1 flex-col justify-between">
        <div className="mx-auto grid grid-cols-2 gap-4 p-4">
          {candidates.map((c) => {
            const isActive = selected === c.name;
            return (
              <button
                type="button"
                key={c.name}
                onClick={() => handleSelect(c.name)}
                className={`group flex h-[66px] max-w-[345px] flex-row items-center gap-2 rounded-[4px] p-4 shadow transition duration-200 ease-in-out ${isActive ? "scale-[1.01] bg-[#00AF8F] text-white shadow-lg" : "bg-white text-black hover:scale-[1.01] hover:bg-[#00AF8F] hover:text-white hover:shadow-lg"}`}
              >
                <div
                  className={`font-semibold ${
                    isActive
                      ? "text-white"
                      : "text-black group-hover:text-white"
                  }`}
                >
                  {c.name}
                </div>
                <div
                  className={`text-sm ${
                    isActive
                      ? "text-white"
                      : "text-gray-500 group-hover:text-white"
                  }`}
                >
                  {c.affiliation}
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
