import logo from '../../img/logo.svg';
import SearchInput from './Input/SearchInput';

export default function Search() {
  return <div className="search">
    <img src={logo} className='search__img' alt="logo"/>
    <SearchInput/>
  </div>;
}
