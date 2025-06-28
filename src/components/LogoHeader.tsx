import Link from "next/link";
import { PATH } from "@/constants/path";

const LogoHeader = () => {
  return (
    <Link href={PATH.HOME}>
      <header className="font-headline-1 border-b-gray100 p-4">
        🗳️ 투표드림
      </header>
    </Link>
  );
};

export default LogoHeader;
