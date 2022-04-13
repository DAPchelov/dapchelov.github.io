import {Link} from "react-router-dom";

const Header = (props) => {
    return (
        <div className="header">
            <div className="logo"><Link to={"/"}>REACTOSCOPE</Link></div>
            <div className="pageArrows">
                <div className="prevButton" onClick={props.prevPage}>&#60;</div>
                <div className="nextButton" onClick={props.nextPage}>&#62;</div>
            </div>
            <input type="text" className="searchInput" onChange={(event) => {props.newQuery(event.target.value)}}/>
        </div>
    )
}
export {Header}
