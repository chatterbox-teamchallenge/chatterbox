import { icons } from "../../../constants/icons";

export default function SearchInput() {
  return <div className="search__input">
    <input type="text" className="search__input__field"/>
    <img src={icons.search} className="search__input__icon"/>
  </div>;
}