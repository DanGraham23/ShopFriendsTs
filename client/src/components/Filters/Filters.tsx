import "./style.css";

const Filters: React.FC = () =>{
    return (
        <div className="filters-nav">
            <ul className="filters">
                <li className="filter">Hats</li>
                <li className="filter">Shirts</li>
                <li className="filter">Pants</li>
                <li className="filter">Shoes</li>
                <li className="filter">Accessories</li>
            </ul>
        </div>
    )
}

export default Filters;