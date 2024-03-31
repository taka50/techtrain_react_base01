import { PostCardList } from "./PostCardList";
import { useSearchParams } from "react-router-dom";

export const PageThread = () => {
    // const location = useLocation();
    // const state = location.state;
    // console.log(location);

    const [searchParams] = useSearchParams();
    // const threadId = searchParams.get("id");
    const title = searchParams.get("title");

    // console.log(threadId, title);

    return (
        <div className="Thread">
            <h2>{title}</h2>
            <PostCardList />
        </div>
    );
};
