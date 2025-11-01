// pages/blog/[slug].tsx
import Head from "next/head";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import { getPostSlugs, getPostBySlug, Post } from "@/lib/blog/posts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

type Props = { post: Post };

export default function PostPage({ post }: Props) {
    return (
        <div className="min-h-screen flex flex-col">
            <Head>
                <title>{`${post.title} | E-Fronpeer Blog`}</title>
                <meta name="description" content={post.title} />
            </Head>
            <Header />
            <main className="flex-1 container mx-auto px-4 py-16 max-w-4xl">
                <nav className="mb-8">
                    <Link
                        href="/blog"
                        className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2"
                    >
                        ← ブログ一覧に戻る
                    </Link>
                </nav>
                <article className="bg-white rounded-lg shadow-md p-8">
                    <header className="mb-8">
                        <h1 className="text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>
                        <div className="flex items-center gap-4 text-sm text-gray-600 border-b border-gray-200 pb-4">
                            <time dateTime={post.date}>
                                更新日：
                                {new Date(post.date).toLocaleDateString('ja-JP', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </time>
                            {post.author && (
                                <div className="flex items-center gap-2">
                                    {post.avatar && (
                                        <img
                                            src={post.avatar}
                                            alt={post.author}
                                            className="w-8 h-8 rounded-full"
                                        />
                                    )}
                                    <span>執筆者: {post.author}</span>
                                </div>
                            )}
                        </div>
                    </header>
                    <div
                        className="markdown-body"
                        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                    />
                </article>
            </main>
            <Footer />
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const slugs = getPostSlugs().map((s: string) => s.replace(/\.md$/, ""));
    return {
        paths: slugs.map((slug: string) => ({ params: { slug } })),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
    const slug = ctx.params?.slug as string;
    const post = getPostBySlug(slug);
    return { props: { post } };
};
