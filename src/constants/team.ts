import { PART_CODE, PART_CODE_TYPE } from "./part.code";
import { TEAM_CODE, TEAM_CODE_TYPE } from "./team.code";

export interface MemberData {
  name: string;
  part: PART_CODE_TYPE;
}

export interface TeamData {
  code: TEAM_CODE_TYPE;
  members: MemberData[];
}

export const TEAM: TeamData[] = [
  {
    code: TEAM_CODE.DEARDREAM,
    members: [
      { name: "김영서", part: PART_CODE.FRONTEND },
      { name: "이주희", part: PART_CODE.FRONTEND },
      { name: "한혜수", part: PART_CODE.BACKEND },
      { name: "오지현", part: PART_CODE.BACKEND },
    ],
  },
  {
    code: TEAM_CODE.INFLUEE,
    members: [
      { name: "최서연", part: PART_CODE.FRONTEND },
      { name: "한서정", part: PART_CODE.FRONTEND },
      { name: "박서연", part: PART_CODE.BACKEND },
      { name: "박채연", part: PART_CODE.BACKEND },
    ],
  },
  {
    code: TEAM_CODE.POPUPCYCLE,
    members: [
      { name: "김철흥", part: PART_CODE.FRONTEND },
      { name: "송아영", part: PART_CODE.FRONTEND },
      { name: "김준형", part: PART_CODE.BACKEND },
      { name: "임도현", part: PART_CODE.BACKEND },
    ],
  },
  {
    code: TEAM_CODE.PROMETHA,
    members: [
      { name: "권동욱", part: PART_CODE.FRONTEND },
      { name: "김서연", part: PART_CODE.FRONTEND },
      { name: "박정하", part: PART_CODE.BACKEND },
      { name: "서채연", part: PART_CODE.BACKEND },
    ],
  },
  {
    code: TEAM_CODE.HONEYHOME,
    members: [
      { name: "신수진", part: PART_CODE.FRONTEND },
      { name: "원채영", part: PART_CODE.FRONTEND },
      { name: "이석원", part: PART_CODE.BACKEND },
      { name: "최근호", part: PART_CODE.BACKEND },
    ],
  },
];
