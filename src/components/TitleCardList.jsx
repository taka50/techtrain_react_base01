import { useState, useEffect } from "react";
import { TitleCard } from "./TitleCard";

export const TitleCardList = () => {
    const [titleObjs, setTitleObj] = useState([]);

    /* APIから直近10件のスレッドのIDとタイトルを取得 */
    useEffect(() => {
        console.log("TitleCardList : get thread from api.");
        fetch("https://railway.bulletinboard.techtrain.dev/threads?offset=0")
          .then((response) => response.json())
          .then((data) => {
            setTitleObj((titleObjs) => data);
          })
          .catch((error) => {
            console.log(error);
          });
    }, []);

    console.log(titleObjs);

    return (
        <>
            <div className="TitleCardList">
                { titleObjs.map((titleObj) => <TitleCard key={titleObj.id} id={titleObj.id}>{titleObj.title}</TitleCard>) }
            </div>
        </>
    );
};
