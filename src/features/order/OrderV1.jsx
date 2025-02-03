// Test ID: IIDSAT

import { useLoaderData, useParams } from "react-router-dom";
import { getOrder, updateOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import { useEffect, useState } from "react";
import { removeAllPizza } from "../cart/cartSlice";
import {
  addPriority,
  finalPrice,
  removePriorityAndTotalPrice,
} from "./orderSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import Loader from "../../ui/Loader";

const orders = {
  id: "ABCDEF",
  customer: "Jonas",
  phone: "123456789",
  address: "Arroios, Lisbon , Portugal",
  priority: true,
  estimatedDelivery: "2027-04-25T10:00:00",
  cart: [
    {
      pizzaId: 7,
      name: "Napoli",
      quantity: 3,
      unitPrice: 16,
      totalPrice: 48,
    },
    {
      pizzaId: 5,
      name: "Diavola",
      quantity: 2,
      unitPrice: 16,
      totalPrice: 32,
    },
    {
      pizzaId: 3,
      name: "Romana",
      quantity: 1,
      unitPrice: 15,
      totalPrice: 15,
    },
  ],
  position: "-9.000,38.000",
  orderPrice: 95,
  priorityPrice: 19,
};

function Order() {
  // // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {orderId}= useParams()

  // const order = useLoaderData();
  // const {
  //   id,
  //   status,
  //   priority,
  //   priorityPrice,
  //   orderPrice,
  //   estimatedDelivery,
  //   cart,
  // } = order;
  const { totalPriceAfterPriority: totalPrice } = useSelector(
    (store) => store.order,
  );
  const dispatch = useDispatch();
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  // const [isLoading, setIsLoading] = useState(false);

  // if (isLoading) return <Loader />;

  // useEffect(() => {
  //   dispatch(removeAllPizza());

  //   return () => {
  //     dispatch(removePriorityAndTotalPrice());
  //   };
  // }, [priorityPrice, dispatch]);
   useEffect(()=>{})
  console.log(orderPrice);
  async function handleMakePriority() {
    dispatch(addPriority(totalPrice * 0.2));
    dispatch(finalPrice(totalPrice * 0.2 + totalPrice));
    // setIsLoading(true);
    await updateOrder(id, {
      ...order,
      priority: true,
      priorityPrice: totalPrice * 0.2,
    });
    // setIsLoading(false);
   
  }
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
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-y border-stone-200">
        {cart.map((item) => (
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
export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}
export default Order;
