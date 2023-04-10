import "./style.css";

interface Props {
    curFilter: string,
    setCurFilter: React.Dispatch<React.SetStateAction<string>>
}

const Filters: React.FC<Props> = (props) =>{
    return (
        <div className="filters-nav">
            <ul className="filters">
                <li className={`filter ${props.curFilter === "hat" ? "filter-selected" : ""}`}
                onClick={() => props.setCurFilter("hat")}>Hats</li>
                <li className={`filter ${props.curFilter === "shirt" ? "filter-selected" : ""}`} 
                onClick={() => props.setCurFilter("shirt")}>Shirts</li>
                <li className={`filter ${props.curFilter === "pants" ? "filter-selected" : ""}`} 
                onClick={() => props.setCurFilter("pants")}>Pants</li>
                <li className={`filter ${props.curFilter === "shoes" ? "filter-selected" : ""}`} 
                onClick={() => props.setCurFilter("shoes")}>Shoes</li>
                <li className={`filter ${props.curFilter === "other" ? "filter-selected" : ""}`} 
                onClick={() => props.setCurFilter("other")}>Accessories</li>
            </ul>
        </div>
    )
}

export default Filters;