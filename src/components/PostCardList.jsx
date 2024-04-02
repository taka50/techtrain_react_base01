import { PostCard } from "./PostCard";

export const PostCardList = (props) => {
    const { posts } = props;

    return (
        <div className="PostCardList">
            {posts.map((post) => (
                <PostCard key={post.id}>{post.post}</PostCard>
            ))}
        </div>
    );
};
