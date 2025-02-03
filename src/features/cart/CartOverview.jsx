import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CartOverview() {
  const { totalQuantity, totalPriceOfAllPizzas } = useSelector(
    (store) => store.cart,
  );

  return (
    <div className="bottom-0 flex items-center justify-between bg-stone-800 p-4 text-sm uppercase text-stone-200 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalQuantity} pizzas</span>
        <span>${totalPriceOfAllPizzas.toFixed(2)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
