"use client";

import styles from "./styles.module.css";
import matter from "gray-matter";
import { Project } from "@/helpers/database/collections/project";
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";
import rehypeExternalLinks from "rehype-external-links";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import remarkParse from "remark-parse";
import rehypeStringify from "rehype-stringify";
import rehypeSanitize from "rehype-sanitize";
import type { FC } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import parseStringI18N from "@/i18n/helpers/parseStringI18N";

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

const ProjectDetail: FC<{ lang: Locale; dictionary: Dictionary["projectsSection"] } & ProjectDetailProps> = ({ dictionary,
    lang,
    project,
    className,
    ...props
}) => {
    const [loading, setLoading] = useState(true);
    const [contentHtml, setContentHtml] = useState<string | undefined>();
    const localeDict = dictionary;

    useEffect(() => {
        markdownToHtml(parseStringI18N(project.fullContent, lang)).then(
            (htmlContent) => {
                setContentHtml(htmlContent);
                setLoading(false);
            },
        );
    }, [project, lang]);
    if (loading) {
        return <div>{localeDict.loading}...</div>;
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
