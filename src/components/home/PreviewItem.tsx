import { PostType } from "@/types/types";
import Image from "next/image";

export const PreviewItem = ({ post }: { post: PostType }) => {
  const { title, date, content, coverImage } = post;
  return (
    <>
      <article className="bg-white w-full mb-20 h-[25rem] p-5 rounded-md flex">
        <div className="flex-1">
            image 들어갈 곳
        </div>
        <div className="flex-2 flex flex-col items-left gap-8 w-full">
        <span>{date}</span>
        {/* {coverImage && <Image src={coverImage} alt="coverImage" width={30} height={30}/>} */}
        <div className="font-bold text-4xl">{title}</div>
        <div className="text-2xl truncate">{content}</div>
        </div>
      </article>
    </>
  );
};
