import { Link } from "react-router-dom";
export const Header = () => {
    return (
        <>
            <header>
                <h1>
                    <Link to="/">掲示板</Link>
                </h1>
                <h2>
                    <Link to="/createThread">スレッドをたてる</Link>
                </h2>
            </header>
        </>
    )
}
