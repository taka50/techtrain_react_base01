import { PostCard } from "./PostCard";
import styles from "../styles/PostCardList.module.css";

export const PostCardList = (props) => {
    const { posts } = props;

    return (
        <div className={styles["post-card-list"]}>
            {posts.map((post) => (
                <PostCard key={post.id}>{post.post}</PostCard>
            ))}
        </div>
    );
};
