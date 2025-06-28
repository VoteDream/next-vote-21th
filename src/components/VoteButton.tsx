import Image from "next/image";
import Link from "next/link";

const VoteButton = ({ href, label }: { href: string; label: string }) => {
  return (
    <div className="px-4 py-2">
      <Link
        href={href}
        className="shadow-08 flex justify-between rounded-[9px] px-5 py-[22px] transition duration-200 ease-in-out hover:bg-[#00AF8F] hover:text-white hover:shadow-md md:py-9"
      >
        <div className="font-headline-1">{label}</div>
        <Image
          src="/svgs/arrow.svg"
          alt="화살표"
          width={11}
          height={20}
          className="ml-2"
        />
      </Link>
    </div>
  );
};

export default VoteButton;
