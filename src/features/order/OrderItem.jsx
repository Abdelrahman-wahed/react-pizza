
import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item}) {
  const {  quantity, name, totalPrice ,addIngredients} = item;
 
  return (
    <li className="py-4 text-sm">
      <div className="flex items-center justify-between">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="capitalize italic text-stone-500">
        {addIngredients.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
