// lib/posts.ts

import * as fs from "fs";
import * as path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";

export type PostMeta = {
    slug: string;
    title: string;
    date: string;
    author?: string;
    avatar?: string;
};

export type Post = PostMeta & {
    contentHtml: string;
};

const postsDirectory = path.join(process.cwd(), "content");
const FALLBACK_POST_DATE = "1970-01-01";

export function getPostSlugs(): string[] {
    return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".md"));
}

export function getPostBySlug(slug: string): Post {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // MarkdownをHTMLに変換（同期処理）
    const processor = unified()
        .use(remarkParse)
        .use(remarkGfm) // GitHub Flavored Markdown（テーブル、チェックボックスなど）
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeHighlight) // シンタックスハイライト
        .use(rehypeStringify, { allowDangerousHtml: true });

    const result = processor.processSync(content);
    const contentHtml = result.toString();

    const post: Post = {
        slug: realSlug,
        title: data.title || realSlug,
        date: data.date || "",
        contentHtml,
    };

    // authorとavatarがあるときのみ追加
    if (data.author) {
        post.author = data.author;
    }
    if (data.avatar) {
        post.avatar = data.avatar;
    }

    return post;
}

export function getAllPosts(): PostMeta[] {
    try {
        const fileNames = fs.readdirSync(postsDirectory);
        return fileNames
            .filter((file) => file.endsWith(".md"))
            .map((fileName) => {
                const slug = fileName.replace(/\.md$/, "");
                const fullPath = path.join(postsDirectory, fileName);
                const fileContents = fs.readFileSync(fullPath, "utf8");
                const { data } = matter(fileContents);
                const post: PostMeta = {
                    slug,
                    title: data.title || slug,
                    date: data.date || "",
                };

                // authorとavatarがあるときのみ追加
                if (data.author) {
                    post.author = data.author;
                }
                if (data.avatar) {
                    post.avatar = data.avatar;
                }

                return post;
            })
            .sort((a, b) => {
                // 日付の降順でソート（新しいものを先頭に）
                const dateA = new Date(a.date || FALLBACK_POST_DATE);
                const dateB = new Date(b.date || FALLBACK_POST_DATE);
                return dateB.getTime() - dateA.getTime();
            });
    } catch (error) {
        console.error("Error in getAllPosts:", error);
        return [];
    }
}
