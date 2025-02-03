import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";
import { useSelector } from "react-redux";

const Header = () => {
  const {fullName} = useSelector(store=>store.user)

  return (
    <header className="font-roboto flex items-center justify-between sm:px-6 border-b-2 border-stone-200 bg-yellow-400 px-4 py-3 uppercase">
      <Link to="/" className="tracking-widest">
        Fast React Pizza co.
      </Link>
      <SearchOrder />
   { fullName&& <UserName />}
    </header>
  );
};

export default Header;
