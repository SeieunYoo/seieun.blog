import useParseDate from "@/hooks/useParseDate";
import { PostType } from "@/types/types";
import Image from "next/image";

export const PreviewItem = ({ post }: { post: PostType }) => {
  const { title, date, info, coverImage } = post;
  const parsedDate = useParseDate(date);

  return (
    <>
      <article className="w-full mb-20 tablet:h-[25rem] p-5 rounded-md flex border border-solid border-gray-300 flex-col tablet:flex-row">
        <Image
          src={coverImage}
          alt={title}
          width={250}
          height={250}
          className="pb-10 flex-1 w-full tablet:pr-10 tablet:pb-0 tablet:w-[revert-layer]"
        />

        <div className="flex-2 flex flex-col items-left gap-8 w-full">
          <div className="font-bold text-4xl overflow-hidden text-ellipsis">{title}</div>
          <span>
            {parsedDate.year}년 {parsedDate.month}월 {parsedDate.day}일
          </span>
          <div className="text-2xl truncate">{info}</div>
        </div>
      </article>
    </>
  );
};
