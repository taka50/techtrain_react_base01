import { PostCardList } from "./PostCardList";
import { PostForm } from "./PostForm";

import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import styles from "../styles/PageThread.module.css";

export const PageThread = () => {
    const [searchParams] = useSearchParams();
    const threadId = searchParams.get("id");
    const title = searchParams.get("title");

    const [posts, setPosts] = useState([]);
    const [errorText, setErrorText] = useState("");

    const MAX_GET_TIMES = 10;

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

        for (let i = 0; i < MAX_GET_TIMES; i++) {
            let res = await getPosts(i * 10);

            /* サーバとの通信に失敗し、応答を取得できなかった場合 */
            if (res === null) {
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

        newPosts.reverse(); // 投稿を時系列が古い順に並べ替える
        console.log("updatePost : newPosts ", newPosts);
        setPosts(newPosts);
        setErrorText("");
        console.log("updatePost : 終了(正常)");
    }, [getPosts]);

    /* 初回レンダリング時、APIからthreadIdのスレッドへのポストを取得する */
    useEffect(() => {
        console.log("PostCardList : get posts from api.");
        updatePosts();
    }, [updatePosts]);

    return (
        <div className={styles.PageThread}>
            <div className="PostsContainer">
                <h2>{title}</h2>
                <p>{errorText}</p>
                <PostCardList posts={posts} />
            </div>
            <PostForm updatePosts={updatePosts} threadId={threadId} />
        </div>
    );
};
