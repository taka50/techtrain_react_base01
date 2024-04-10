import { useState, useEffect } from "react";

import styles from "../styles/TitleCardList.module.css";
import { TitleCard } from "./TitleCard";

export const TitleCardList = () => {
    const [titles, setTitles] = useState([]);

    /* APIから直近10件のスレッドのIDとタイトルを取得 */
    useEffect(() => {
        console.log("TitleCardList : get thread from api.");
        fetch("https://railway.bulletinboard.techtrain.dev/threads?offset=0")
            .then((response) => response.json())
            .then((data) => {
                setTitles((prevTitles) => data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    console.log(titles);

    return (
        <div className={styles["title-card-list"]}>
            {titles.map((title) => (
                <TitleCard key={title.id} id={title.id}>
                    {title.title}
                </TitleCard>
            ))}
        </div>
    );
};
