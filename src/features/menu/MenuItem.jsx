import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../cart/cartSlice";
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const { pizzas } = useSelector((store) => store.cart);
  const [quantity, setQuantity] = useState(
    getPizza(id)?.quantity ? getPizza(id)?.quantity : 0,
  );
  const [isAddedCart, setIsAddedCart] = useState(
    pizzas.length !== 0 && quantity > 0 ? true : false,
  );

  const dispatch = useDispatch();

  function getPizza(id) {
    return pizzas.filter((e) => e.pizzaId === id)[0];
  }
  const handleAddToCart = () => {
    setIsAddedCart(true);
    setQuantity(1);
    dispatch(
      addToCart({
        pizzaId: id,
        name,
        quantity: 1,
        unitPrice,
        totalPrice: 1 * unitPrice,
        addIngredients:ingredients,
      }),
    );
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity( getPizza(id)?.quantity - 1);
      dispatch(
        addToCart({
          ...getPizza(id),
          quantity: quantity - 1,
          totalPrice: (quantity - 1) * unitPrice,
        }),
      );
    } else {
      dispatch(removeFromCart(id));
      setIsAddedCart(false);
    }
  };

  const handleIncrementQuantity = () => {
    setQuantity( getPizza(id)?.quantity + 1);
    dispatch(
      addToCart({
        ...getPizza(id),
        quantity: quantity + 1,
        totalPrice: (quantity + 1) * unitPrice,
      }),
    );
  };
  const handleRemoveFromCart = () => {
    setIsAddedCart(false);
    dispatch(removeFromCart(id));
  };

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut && "opacity-60 grayscale"} `}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic">{ingredients.join(", ")}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {!soldOut && (
            <>
              {!isAddedCart ? (
                <Button type="small" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              ) : (
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-3">
                    <Button type="small" onClick={handleDecrementQuantity}>
                      -
                    </Button>
                    <p>{ getPizza(id)?.quantity}</p>
                    <Button type="small" onClick={handleIncrementQuantity}>
                      +
                    </Button>
                  </div>
                  <Button type="small" onClick={handleRemoveFromCart}>
                    Delete
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
