import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { PostCard } from "./PostCard";

export const PostCardList = () => {
    const [searchParams] = useSearchParams();
    const threadId = searchParams.get("id");

    const [posts, setPosts] = useState([]);
    const [errorText, setErrorText] = useState("");

    const MAX_TIMES_GET = 10;

    const getPosts = useCallback(
        async (offset) => {
            console.log("getPosts : 開始");
            const url = `https://railway.bulletinboard.techtrain.dev/threads/${threadId}/posts?offset=${offset}`;

            try {
                const response = await fetch(url);
                console.log("getPosts : 通信成功");
                console.log("response : ", response);
                const data = await response.json();
                console.log("data : ", data);
                console.log("getPosts : 終了");

                return data;
            } catch (e) {
                console.log("getPosts : 通信失敗", e.message);
                console.log("getPosts : 終了");

                return null;
            }
        },
        [threadId]
    );

    const updatePosts = useCallback(async () => {
        console.log("updatePosts : 開始");
        let newPosts = [];

        for (let i = 0; i < MAX_TIMES_GET; i++) {
            let res = await getPosts(i * 10);

            /* サーバとの通信に失敗し、応答を取得できなかった場合 */
            if (res === null || typeof res !== "object") {
                setErrorText("サーバーとの通信に失敗しました.");
                console.log("updatePosts : 終了(通信失敗)");
                return;
            }

            /* サーバとの通信に成功し、応答を取得できた場合 */

            /* エラー応答を受け取った場合 */
            if ("ErrorMessageJP" in res) {
                setErrorText(res.ErrorMessageJP);
                console.log("updatePosts : 終了(エラー応答)");
                return;
            }

            /* エラー応答でも成功応答でもない応答を受け取った場合 */
            if (!("posts" in res)) {
                console.log(
                    "updatePosts : 未定義のプロパティを持つレスポンスを受け取りました"
                );
                console.log("updatePosts : 終了(未定義の応答)");
                return;
            }

            /* 成功応答を受け取った場合 */
            newPosts = [...newPosts, ...res.posts];

            if (res.posts.length < 10) {
                break;
            }
        }

        console.log("updatePost : newPosts ", newPosts);
        setPosts(newPosts);
        console.log("updatePost : 終了(正常)");
    }, [getPosts]);

    /* 初回レンダリング時、APIからthreadIdのスレッドへのポストを取得する */
    useEffect(() => {
        console.log("PostCardList : get posts from api.");
        updatePosts();
    }, [updatePosts]);

    return (
        <div className="PostCardList">
            <p>{errorText}</p>
            {posts.map((post) => (
                <PostCard key={post.id}>{post.post}</PostCard>
            ))}
        </div>
    );
};
