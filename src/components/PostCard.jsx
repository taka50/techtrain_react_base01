export const PostCard = (props) => {
    const { children } = props;

    return (
        <div className="PostCard">
            <p>{children}</p>
        </div>
    );
};
