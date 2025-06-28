import { PART_CODE, PART_CODE_TYPE } from "./part.code";
import { TEAM_CODE, TEAM_CODE_TYPE } from "./team.code";

export const TEAM_LABEL: Record<TEAM_CODE_TYPE, string> = {
  [TEAM_CODE.DEARDREAM]: "이어드림",
  [TEAM_CODE.INFLUEE]: "인플루이",
  [TEAM_CODE.POPUPCYCLE]: "팝업사이클",
  [TEAM_CODE.PROMETHA]: "프로메사",
  [TEAM_CODE.HONEYHOME]: "하니홈",
};

export const PART_LABEL: Record<PART_CODE_TYPE, string> = {
  [PART_CODE.FRONTEND]: "프론트",
  [PART_CODE.BACKEND]: "백엔드",
  [PART_CODE.NONE]: "기타",
};
