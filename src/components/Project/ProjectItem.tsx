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
    <div className="flex flex-col gap-2">
      <div className="markdown flex flex-col w-full gap-2">
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
        {/* 마크다운 파싱: 제목, 그림, 내용, 기술스택 순서로 표시 */}
        {markdown && (() => {
          // 제목 추출 (## 로 시작하는 라인)
          const titleMatch = markdown.match(/^## .*/m);
          const titleContent = titleMatch ? titleMatch[0] : "";
          
          // 기술스택 추출 (마지막 줄의 백틱으로 감싼 부분)
          const stackMatch = markdown.match(/`[^`]+`(?:\s+`[^`]+`)*\s*$/);
          const stackContent = stackMatch ? stackMatch[0] : "";
          
          // 이미지 추출
          const images = Array.from(markdown.matchAll(/!\[(.*?)\]\((.*?)\)/g)).map((m) => ({
            alt: m[1],
            src: m[2],
          }));
          
          // 제목, 이미지, 기술스택 제거한 내용
          let contentOnly = markdown
            .replace(/^## .*/m, "") // 제목 제거
            .replace(/!\[.*?\]\(.*?\)\s*/g, "") // 이미지 제거
            .replace(/`[^`]+`(?:\s+`[^`]+`)*\s*$/, ""); // 기술스택 제거
          
          return (
            <>
              {/* 1. 제목 */}
              {titleContent && (
                <div className="font-bold text-lg mb-2">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {titleContent}
                  </ReactMarkdown>
                </div>
              )}
              
              {/* 2. 그림 */}
              <MarkdownGallery images={images} />
              
              {/* 3. 내용 */}
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {contentOnly}
              </ReactMarkdown>
              
              {/* 4. 기술스택 */}
              {stackContent && (
                <div className="mt-4">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {stackContent}
                  </ReactMarkdown>
                </div>
              )}
            </>
          );
        })()}
      </div>
    </div>
  );
};

export default ProjectItem;
