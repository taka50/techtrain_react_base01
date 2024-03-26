export const TitleCard = (props) => {
    const { id } = props;
    
    return (
        <>
            <div className="TitleCard">
                <h3>{props.children}</h3>
            </div>
        </>
    )
}
