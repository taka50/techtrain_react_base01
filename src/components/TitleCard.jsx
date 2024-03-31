import { Link } from "react-router-dom";

export const TitleCard = (props) => {
    const { id, children } = props;

    // console.log("threadId : " + String(id));

    return (
        <div className="TitleCard">
            {/* <Link to={url} state={{title: children, id: id}}  >
                <h3>{props.children}</h3>
            </Link> */}
            <Link to={`/thread?id=${id}&title=${children}`}>
                <h3>{props.children}</h3>
            </Link>
        </div>
    );
};
