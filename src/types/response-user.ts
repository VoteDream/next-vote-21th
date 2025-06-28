import { User } from "./user";

export interface ResponseUser extends User {
  id: number;
  accessToken: string;
  isDemoVoted: boolean;
  isLeaderVoted: boolean;
}
