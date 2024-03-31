import { Link } from "react-router-dom";
import styles from "../styles/Header.module.css";

export const Header = () => {
    return (
        <header className={styles.header}>
            <h1>
                <Link to="/">掲示板</Link>
            </h1>
            <h2>
                <Link to="/createThread">スレッドをたてる</Link>
            </h2>
        </header>
    );
};
