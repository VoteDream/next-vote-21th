import { PART_CODE_TYPE } from "../constants/part.code";
import { TEAM_CODE_TYPE } from "../constants/team.code";

export interface User {
  loginId: string;
  password: string;
  email: string;
  part: PART_CODE_TYPE;
  username: string;
  team: TEAM_CODE_TYPE;
}
