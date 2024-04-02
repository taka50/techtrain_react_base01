import { useState } from "react";

export const PostForm = (props) => {
    const { updatePosts, threadId } = props;
    const [postText, setPostText] = useState("");
    const [isPosting, setIsPosting] = useState(false);
    const [errorText, setErrorText] = useState("");

    const isPostBlankOrEmpty = () => {
        return !postText || !postText.match(/\S/g);
    };

    const sendPostData = async () => {
        console.log("sendPostData : 開始");
        const url = `https://railway.bulletinboard.techtrain.dev/threads/${threadId}/posts`;
        const body = { post: postText };
        const params = { method: "POST", body: JSON.stringify(body) };

        console.log("sendPostData : url", url);

        try {
            const response = await fetch(url, params);
            console.log("postThreadData : 通信成功");
            console.log("response", response);
            const data = await response.json();
            console.log("data : ", data);
            console.log("sendPostData : 終了");

            return data;
        } catch (e) {
            console.log("sendPostData : 通信失敗", e.message);
            console.log("sendPostData : 終了");

            return null;
        }
    };

    const createPost = async () => {
        console.log("createPost : 開始");

        if (isPosting) {
            console.log("createPost : 投稿処理中");
            console.log("createPost : 終了");
            return;
        }

        if (isPostBlankOrEmpty()) {
            setErrorText("タイトルを入力してください");
            setIsPosting(false);
            console.log("createPost : 終了");
            return;
        }

        setIsPosting(true);
        const res = await sendPostData();
        console.log("createPost : res", res);
        setIsPosting(false);

        /* サーバとの通信に失敗し、応答を取得できなかった場合 */
        if (res === null) {
            setErrorText("サーバーとの通信に失敗しました.");
            console.log("createPost : 終了(通信失敗)");
            return;
        }

        /* サーバとの通信に成功し、応答を取得できた場合 */

        /* エラー応答を受け取った場合 */
        if ("ErrorMessageJP" in res) {
            setErrorText(res.ErrorMessageJP);
            console.log("createPost : 終了(エラー応答)");
            return;
        }

        /* エラー応答でも成功応答でもない応答を受け取った場合 */
        if (!("post" in res)) {
            console.log(
                "createPost : 未定義のプロパティを持つレスポンスを受け取りました"
            );
            console.log("createPost : 終了(未定義の応答)");
            return;
        }

        /* 成功応答を受け取った場合 */
        console.log("createPost : ポストを更新");
        updatePosts(); // ポスト一覧を更新
        setPostText(""); // 入力フォームを空欄に
        console.log("createPost : 終了(通信成功)");
    };

    return (
        <div className="PostForm">
            <textarea
                rows="5"
                cols="33"
                placeholder="投稿しよう！"
                onChange={(e) => {
                    setPostText(e.target.value);
                }}
                value={postText}
            ></textarea>
            <p>{errorText}</p>
            <div>
                <button
                    disabled={isPostBlankOrEmpty() || isPosting}
                    onClick={createPost}
                >
                    投稿
                </button>
            </div>
        </div>
    );
};
