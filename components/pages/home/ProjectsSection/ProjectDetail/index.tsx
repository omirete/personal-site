"use client";

import styles from "./styles.module.css";
import { Project } from "@/helpers/database/ProjectsCtor";
import matter from "gray-matter";
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";
import rehypeExternalLinks from "rehype-external-links";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import remarkParse from "remark-parse";
import rehypeStringify from "rehype-stringify";
import rehypeSanitize from "rehype-sanitize";

export interface ProjectDetailProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    project: Project;
}

const markdownToHtml = async (markdown?: string): Promise<string> => {
    if (markdown) {
        // Use gray-matter to parse the post metadata section
        const matterResult = matter(markdown);

        // Use remark to convert markdown into HTML string
        const processedContent = await unified()
            .use(remarkParse)
            .use(remarkRehype)
            .use(rehypeExternalLinks, {
                rel: ["noreferrer noopener"],
                target: "_blank",
            })
            .use(rehypeSanitize)
            .use(rehypeStringify)
            .process(matterResult.content);
        // .use(rehypeExternalLinks, { rel: "noreferrer noopener" })
        const htmlStr = processedContent.toString();
        return htmlStr;
    } else {
        return "";
    }
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({
    project,
    className,
    ...props
}) => {
    const [loading, setLoading] = useState(true);
    const [contentHtml, setContentHtml] = useState<string | undefined>();

    useEffect(() => {
        markdownToHtml(project.fullContent).then((htmlContent) => {
            setContentHtml(htmlContent);
            setLoading(false);
        });
    }, [project]);
    if (loading) {
        return <div>Loading...</div>;
    } else {
        return (
            <div
                className={`${styles.baseStyle} ${className ?? ""}`}
                dangerouslySetInnerHTML={{ __html: contentHtml ?? "" }}
                {...props}
            />
        );
    }
};

export default ProjectDetail;
