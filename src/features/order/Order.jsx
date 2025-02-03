import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { getOrder, updateOrder } from "../../services/apiRestaurant";
import { calcMinutesLeft, formatCurrency } from "../../utils/helpers";
import Loader from "../../ui/Loader";
import Button from "../../ui/Button";
import OrderItem from "./OrderItem";
import { removeAllPizza } from "../cart/cartSlice";
import {
  addPriority,
  finalPrice,
  removePriorityAndTotalPrice,
} from "./orderSlice";

function Order() {
  const { orderId: id } = useParams();
  const dispatch = useDispatch();
  const [dataFetch, setDataFetch] = useState({});
  const [refreshOnUpdate, setRefreshOnUpdate] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const [dateDelivery, setDateDelivery] = useState("");
  const {
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = dataFetch;
  const { totalPriceAfterPriority: totalPrice } = useSelector(
    (store) => store.order,
  );
  useEffect(() => {
    async function getMyData() {
      try {
        setIsLoading(true);
        const data = await getOrder(id);
        data && setDataFetch(data);
        const reciveDate = new Date(data.estimatedDelivery);
        setDateDelivery(reciveDate);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getMyData();
  }, [id, refreshOnUpdate]);

  useEffect(() => {
    dispatch(removeAllPizza());

    return () => {
      dispatch(removePriorityAndTotalPrice());
    };
  }, [priorityPrice, dispatch]);
  const result = dateDelivery ? format(dateDelivery, "MMM dd, hh:mm aa") : "";

  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  async function handleMakePriority() {
    dispatch(addPriority(totalPrice * 0.2));
    dispatch(finalPrice(totalPrice * 0.2 + totalPrice));
    
    await updateOrder(id, {
      ...dataFetch,
      priority: true,
      priorityPrice: totalPrice * 0.2,
    });
    setRefreshOnUpdate(!refreshOnUpdate);
  }
  if (isLoading) return <Loader />;
  return (
    <div className="relative space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Order #{id} Status</h2>

        <div className="space-x-2 text-sm font-bold uppercase tracking-wide">
          {priority && (
            <span className="text-semibold rounded-full bg-red-500 px-3 py-1 text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-200 p-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {result ? result : "laoding..."})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-y border-stone-200">
        {cart?.map((item) => (
          <OrderItem key={item.pizzaId} item={item} />
        ))}
      </ul>
      <div className="mt-5 space-y-2 bg-stone-200 p-5">
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      <div className="absolute right-0">
        {!priority && (
          <Button type="primary" onClick={handleMakePriority}>
            Make priority
          </Button>
        )}
      </div>
    </div>
  );
}

export default Order;
