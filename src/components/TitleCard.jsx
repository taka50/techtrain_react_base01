import styles from "../styles/TitleCard.module.css";
import { Link } from "react-router-dom";

export const TitleCard = (props) => {
    const { id, children } = props;

    // console.log("threadId : " + String(id));

    return (
        <div className={styles["title-card"]}>
            <Link to={`/thread?id=${id}&title=${children}`}>
                <h3 className={styles["title-card-text"]}>{props.children}</h3>
            </Link>
        </div>
    );
};
