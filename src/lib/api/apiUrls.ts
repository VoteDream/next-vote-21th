export const API_URLS = {
  Register: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/register`,
  Login: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/login`,
  VOTE_STATUS: (voteType: "DEMODAY" | "PARTLEADER") =>
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/vote/${voteType}/status`,
};
