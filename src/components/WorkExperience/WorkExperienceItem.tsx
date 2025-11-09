import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { WorkExperienceProps } from "@/types";
import WorkExperienceGallery from "./WorkExperienceGallery";

const WorkExperienceItem = ({ 
  name,   
  position, 
  period, 
  markdown, 
  imgSrc,
  team,
  description,
  team_2,
  description_2,
  markdown_2,
  gallery,
}: WorkExperienceProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-0">
      {/* 왼쪽: 이미지+회사명 sticky */}
      <div className="flex md:flex-col items-center md:items-start mr-4 gap-6 md:sticky md:top-24 md:self-start z-10">
        {imgSrc && (
          <Image
            src={imgSrc}
            width="200"
            height="200"
            alt={name}
            className="object-cover rounded-lg border-[1px] border-GRAY_LIGHT border-solid w-24 h-24"
          />
        )}
        <div className="w-48">
          <h3>{name}</h3>
          <div className="flex flex-col">
            <span className="m-0">{position}</span>
            <span>{`${period[0]} - ${period[1]}`}</span>
          </div>
        </div>
      </div>
      {/* 오른쪽: 마크다운 일반 영역 */}
      <div className="md:border-GRAY_LIGHT md:border-solid md:border-l-[1px] md:pl-4 md:ml-6 markdown w-full">
        <div>
          {/* <h4>{team}</h4> */}
          {/* <blockquote className="whitespace-pre-wrap">{`${description}`}</blockquote> */}
          {/* 마크다운을 이미지 블록별로 분리하여, 각 제목 밑에 갤러리와 텍스트를 표시 */}
          {markdown && (() => {
            // #### 기준으로 분리
            const blocks = (markdown ?? "").split(/(?=^#### )/m);
            return blocks.map((block, idx) => {
              // 제목 추출
              const titleMatch = block.match(/^#### .*/m);
              // 이미지 추출
              const images = Array.from(block.matchAll(/!\[(.*?)\]\((.*?)\)/g)).map((m) => ({ alt: m[1], src: m[2] }));
              // 텍스트(이미지 제거)
              const text = block.replace(/!\[.*?\]\(.*?\)\s*/g, "");
              // 키워드(백틱) 추출
              const keywordMatch = text.match(/^[`].*?[`].*$/m);
              // 키워드 아래 텍스트
              let textWithoutTitle = text.replace(/^#### .*/m, "");
              let textWithoutKeyword = textWithoutTitle;
              if (keywordMatch) {
                textWithoutKeyword = textWithoutTitle.replace(/^[`].*?[`].*$/m, "");
              }
              return (
                <div key={idx} className="mb-6">
                  {titleMatch && <div className="font-bold text-lg"><ReactMarkdown remarkPlugins={[remarkGfm]}>{titleMatch[0]}</ReactMarkdown></div>}
                  {keywordMatch && <div className="mb-4"><ReactMarkdown remarkPlugins={[remarkGfm]}>{keywordMatch[0]}</ReactMarkdown></div>}
                  {images.length > 0 && <WorkExperienceGallery images={images} />}
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{textWithoutKeyword}</ReactMarkdown>
                </div>
              );
            });
          })()}
        </div>
        {team_2 && description_2 && (
          <div>
            <h4>{team_2}</h4>
            <blockquote className="whitespace-pre-wrap">{`${description_2}`}</blockquote>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown_2 ?? ""}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkExperienceItem;
