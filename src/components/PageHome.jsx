import styles from "../styles/PageHome.module.css";
import { TitleCardList } from "./TitleCardList";

export const PageHome = () => {
    return (
        <div className={styles["container"]}>
            <h2 className={styles["header-text"]}>新着スレッド</h2>
            <TitleCardList></TitleCardList>
        </div>
    );
};
