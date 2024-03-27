import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const PageCreateThread = () => {
    const titleText = useRef("");
    const isPosting = useRef(false);
    const navigate = useNavigate();
    
    const [errorText, setErrorText] = useState("");

    const CODE_SUCCESS = 200;
    const CODE_VAL_ERROR = 400;
    const CODE_SEV_ERROR = 500;
    const CODE_CNCT_ERROR = -100;

    const isTitleBlankOrEmpty = () => {
        return (!titleText.current || !titleText.current.match(/\S/g));
    };

    const sendThreadData = async () => {
        console.log("sendThreadData : 開始")
        const url = "https://railway.bulletinboard.techtrain.dev/threads";
        const body = {title : titleText.current};
        const params = {method : "POST", body : JSON.stringify(body)};

        try {
            console.log('sendThreadData : 通信成功');
            const response = await fetch(url, params);
            console.log(response);

            return response.status
        }catch(e){
            console.log('sendThreadData : 通信失敗', e.message);
            console.log("sendThreadData : 終了(CATCH_ERROR)");

            return CODE_CNCT_ERROR;
        }
    }

    const createThread = async () => {
        console.log("createThread : 開始");

        if(isPosting.current){
            console.log("createThread : 投稿処理中")
            console.log("createThread : 終了");
            return;
        }else{
            isPosting.current = true;
        }

        if(isTitleBlankOrEmpty()){
            setErrorText("タイトルを入力してください");
            isPosting.current = false;
            console.log("createThread : 終了");
            return 
        }

        const result = await sendThreadData();
        console.log("result :" + String(result));

        switch(result){
            case CODE_SUCCESS:
                console.log("createThread : 作成成功");
                console.log("createThread : home画面に戻ります");
                setErrorText("");
                navigate("/");
                break;
            case CODE_VAL_ERROR:
                console.log("createThread : 作成失敗（バリデーションエラー）");
                setErrorText("そのタイトル名はスレッドのタイトルに使用できません");
                break;
            case CODE_SEV_ERROR:
                console.log("createThread : 作成失敗(サーバでエラーが発生しました)");
                setErrorText("サーバとの通信中にエラーが発生しました");
                break;
            case CODE_CNCT_ERROR:
                setErrorText("サーバとの接続に失敗しました");
                break;
            default:
                console.log("createThread : 未定義の通信結果")
        }

        isPosting.current = false;
        console.log("createThread : 終了");
    }

    return (
        <>
            <div className="PageCreateThread">
                <h2>スレッド新規作成</h2>
                <input type="text" onChange={(e) => {titleText.current = e.target.value}}></input>
                <p>{errorText}</p>
                <div className="buttonContainer">
                    <Link to="/">TOPに戻る</Link>
                    <button onClick={createThread}>作成</button>
                </div>
            </div>
        </>
    )
} 
