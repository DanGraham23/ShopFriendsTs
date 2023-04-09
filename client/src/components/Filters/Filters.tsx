import "./style.css";

interface Props {
    curFilter: string,
    setCurFilter: React.Dispatch<React.SetStateAction<string>>
}

const Filters: React.FC<Props> = (props) =>{
    return (
        <div className="filters-nav">
            <ul className="filters">
                <li className="filter" onClick={() => props.setCurFilter("hat")}>Hats</li>
                <li className="filter" onClick={() => props.setCurFilter("shirt")}>Shirts</li>
                <li className="filter" onClick={() => props.setCurFilter("pants")}>Pants</li>
                <li className="filter" onClick={() => props.setCurFilter("shoes")}>Shoes</li>
                <li className="filter" onClick={() => props.setCurFilter("other")}>Accessories</li>
            </ul>
        </div>
    )
}

export default Filters;