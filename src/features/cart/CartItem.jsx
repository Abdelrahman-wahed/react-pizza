import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addToCart, removeFromCart } from "../cart/cartSlice";
import { useState } from "react";
function CartItem({ item }) {
  const { pizzaId, name, quantity: quant, unitPrice, totalPrice } = item;
  const [quantity, setQuantity] = useState(quant);
  const dispatch = useDispatch();

  const { pizzas } = useSelector((store) => store.cart);

  function getPizza(id) {
    return pizzas.filter((e) => e.pizzaId === id)[0];
  }
  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      dispatch(
        addToCart({
          ...getPizza(pizzaId),
          quantity: quantity - 1,
          totalPrice: (quantity - 1) * unitPrice,
        }),
      );
    } else {
      dispatch(removeFromCart(pizzaId));
    }
  };

  const handleIncrementQuantity = () => {
    setQuantity((prev) => prev + 1);
    dispatch(
      addToCart({
        ...getPizza(pizzaId),
        quantity: quantity + 1,
        totalPrice: (quantity + 1) * unitPrice,
      }),
    );
  };
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(pizzaId));
  };
  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <Button type="small" onClick={handleDecrementQuantity}>
              -
            </Button>
            <p>{quantity}</p>
            <Button type="small" onClick={handleIncrementQuantity}>
              +
            </Button>
          </div>
          <Button type="small" onClick={handleRemoveFromCart}>
            Delete
          </Button>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
