import { Link } from "react-router-dom";
import styles from "../styles/Header.module.css";

export const Header = () => {
    return (
        <header className={styles["header"]}>
            <h1 className={styles["home-link"]}>
                <Link to="/">掲示板</Link>
            </h1>
            <h2 className={styles["create-thread-link"]}>
                <Link to="/createThread">スレッドをたてる</Link>
            </h2>
        </header>
    );
};
