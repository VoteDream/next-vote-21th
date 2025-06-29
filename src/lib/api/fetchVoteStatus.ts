import { useUserStore } from "@/stores/useUserStore";
import { API_URLS } from "./apiUrls";

export const fetchVoteStatus = async () => {
  const user = useUserStore.getState().user;
  if (!user) return;

  try {
    const demoResponse = await fetch(API_URLS.VOTE_STATUS("DEMODAY"), {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    const leaderResponse = await fetch(API_URLS.VOTE_STATUS("PARTLEADER"), {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    const demoData = await demoResponse.json();
    const leaderData = await leaderResponse.json();

    useUserStore.getState().setUser({
      ...user,
      isDemoVoted: demoData.result.voted,
      isLeaderVoted: leaderData.result.voted,
    });
  } catch {}
};
