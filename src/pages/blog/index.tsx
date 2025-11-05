import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { getAllPosts, PostMeta } from "@/lib/blog/posts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

type Props = { posts: PostMeta[] };

export default function BlogIndex({ posts }: Props) {
    const { basePath } = useRouter();

    return (
        <div className="min-h-screen flex flex-col">
            <Head>
                <title>ブログ | E-Fronpeer</title>
                <meta name="description" content="E-Fronpeerのブログ記事一覧" />
            </Head>
            <Header />
            <main className="flex-1 container mx-auto px-4 py-16 max-w-4xl">
                <h1 className="text-4xl font-bold text-center mb-12">ブログ記事一覧</h1>
                <div className="grid gap-8">
                    {posts.map((post) => (
                        <article key={post.slug} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                            <div className="post-header">
                                <h2 className="text-2xl font-bold mb-3">
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="text-gray-900 hover:text-blue-600 transition-colors"
                                    >
                                        {post.title}
                                    </Link>
                                </h2>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <time dateTime={post.date}>
                                        更新日：
                                        {new Date(post.date).toLocaleDateString('ja-JP')}
                                    </time>
                                    {post.author && (
                                        <div className="flex items-center gap-2">
                                            {post.avatar && (
                                                <img
                                                    src={
                                                        post.avatar.startsWith("/")
                                                            ? `${basePath}${post.avatar}`
                                                            : post.avatar
                                                    }
                                                    alt={post.author}
                                                    className="w-6 h-6 rounded-full"
                                                />
                                            )}
                                            <span>執筆者: {post.author}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const posts = getAllPosts();
    return { props: { posts } };
};
