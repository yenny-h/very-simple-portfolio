import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MarkdownGallery from "./MarkdownGallery";

import Links from "./Links";

import { ProjectProps } from "@/types";

const ProjectItem = ({
  name,
  description,
  repoUrl,
  webUrl,
  period,
  stack,
  markdown,
  imgSrc,
}: ProjectProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-0">
      <div className="flex flex-col gap-2">
        <div className="flex md:flex-col items-center md:items-start mr-4 gap-6 md:sticky md:top-24 md:self-start z-10">
          {/* {imgSrc && (
            <Image
              src={imgSrc}
              width="200"
              height="200"
              alt={name}
              className="object-cover rounded-lg border-[1px] border-GRAY_LIGHT dark:border-white border-solid w-24 h-24"
            />
          )} */}
          <div className="flex flex-col gap-2">
            <div className="w-48">
              <h3>{name}</h3>
              {/* <div className="flex flex-col">
                <span>{`${period[0]} - ${period[1]}`}</span>
              </div> */}
            </div>
            {/* <Links repoUrl={repoUrl} webUrl={webUrl} /> */}
          </div>
        </div>
      </div>
      <div className="md:border-GRAY_LIGHT md:border-solid md:border-l-[1px] md:pl-4 md:ml-6 markdown flex flex-col w-full gap-2">
        <div>
          {/* <blockquote className="whitespace-pre-wrap">{`${description}`}</blockquote> */}
          {/* <div className="flex gap-1 flex-wrap">
            {stack.map((stack) => (
              <span
                key={stack}
                className="bg-BLACK py-[2px] rounded-md text-xs font-medium font-mono whitespace-nowrap text-white dark:text-BLACK"
              >
                <code className="font-mono">{stack}</code>
              </span>
            ))}
          </div> */}
        </div>
        {/* 마크다운에서 이미지 추출 및 갤러리 렌더 */}
        {markdown && (
          <>
            <MarkdownGallery
              images={
                Array.from(markdown.matchAll(/!\[(.*?)\]\((.*?)\)/g)).map((m) => ({
                  alt: m[1],
                  src: m[2],
                }))
              }
            />
            {/* 이미지 마크다운 제거 후 텍스트만 렌더 */}
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
            >
              {markdown.replace(/!\[.*?\]\(.*?\)\s*/g, "")}
            </ReactMarkdown>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectItem;
