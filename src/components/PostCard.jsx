import styles from "../styles/PostCard.module.css";

export const PostCard = (props) => {
    const { children } = props;

    return (
        <div className={styles["post-card"]}>
            <p className={styles["post-card-text"]}>{children}</p>
        </div>
    );
};
