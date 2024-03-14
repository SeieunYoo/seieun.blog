import useParseDate from "@/hooks/useParseDate";
import { PostType } from "@/types/types";
import Image from "next/image";

export const PreviewItem = ({ post }: { post: PostType }) => {
  const { title, date, info, coverImage } = post;
  const parsedDate = useParseDate(date);

  return (
    <>
      <article className="w-full mb-20 h-[25rem] p-5 rounded-md flex border border-solid border-gray-300">
        <Image
          src={coverImage}
          alt="coverImage"
          width={250}
          height={250}
          className="pr-10 flex-1"
        />

        <div className="flex-2 flex flex-col items-left gap-8 w-full">
          <div className="font-bold text-4xl">{title}</div>
          <span>
            {parsedDate.year}년 {parsedDate.month}월 {parsedDate.day}일
          </span>
          <div className="text-2xl truncate">{info}</div>
        </div>
      </article>
    </>
  );
};
