import { useNavigate } from "react-router-dom";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../../ui/Button";
import { useEffect, useState } from "react";
import { createNewOrder } from "../../services/apiRestaurant";
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from "../../services/apiGeocoding";
import useGeolocation from "./useGeolocation";
import { addPriority, finalPrice } from "./orderSlice";
import EmptyCart from "../cart/EmptyCart";
import { createName, createPhoneNumber, fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number

const validationSchema = Yup.object().shape({
  customer: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First Name is Required!"),
  phone: Yup.string()
    .min(2, "Too Short!")
    .max(15, "Too Long!")
    .required("Phone Number is Required!")
    .matches(
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      "Invalid Phone Number",
    ),
  address: Yup.string().required("Address is Required"),
});

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  // const cart = fakeCart;
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [dataLocation, setDataLocation] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pizzas: cart } = useSelector((store) => store.cart);
  const { fullName , phoneNumber, address } = useSelector((store) => store.user);
  const { totalPriceOfAllPizzas: totalPrice } = useSelector(
    (store) => store.cart,
  );
  const { priority } = useSelector((store) => store.order);
  const {
    isLoading,
    error: errorPosition,
    lat,
    lng,
    getPosition,
  } = useGeolocation();
  useEffect(() => {
    dispatch(fetchAddress(lat, lng));
  }, [lat, lng, dispatch, address]);
  const handleAddress = () => {
    getPosition();
  };

  function totalPriceWithPriority() {
    const result = priority ? totalPrice + priority : totalPrice;
    return result;
  }

  function handleisPrioriry(setFieldValue) {
    return (e) => {
      const value = e.target.checked;
      setFieldValue("priority", value);
      dispatch(addPriority(value ? totalPrice * 0.2 : 0));
    };
  }
  // useEffect(() => {
  //   const getFetchAdress = async () => {
  //     if (lat && lng) {
  //       const data = await getAddress(lat, lng);
  //       const [object] = data.localityInfo.informative.filter(
  //         (e) => e.order === 8,
  //       );
  //       const town = object.name;
  //       const city = data.city;
  //       const country = data.countryName;
  //       const address = town.concat(" ", city, " , ", country);
  //       address &&   dispatch(createAddress(address))
  //     }
  //   };

  //   getFetchAdress();
  // }, [dispatch,lat, lng]);

  // function retreiveAdress(data) {
  //   const b = data?.localityInfo?.informativefilter;
  //   return b;
  // }
  if (cart.length === 0) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      <Formik
        initialValues={{
          customer: fullName,
          phone:phoneNumber,
          address: address,
          priority: false,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          setIsSubmitting(true);
          const value = { ...values, address: address, cart };
          const response = await createNewOrder(
            value,
            setSubmitting,
            setErrors,
            setIsSubmitting,
          );
          !fullName && dispatch(createName(values.customer));
          !phoneNumber && dispatch(createPhoneNumber(values.phone));
          dispatch(finalPrice(totalPriceWithPriority()));
          navigate(`/order/${response.data.data.id}`);
        }}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <div className="mb-5 flex flex-col flex-wrap gap-4 sm:flex-row sm:items-baseline">
              <label className="min-w-32">First Name</label>
              <div className="sm:flex sm:flex-1 sm:flex-col">
                <Field
                  type="text"
                  name="customer"
                  className={`input sm:flex-1 ${errors.customer && touched.customer && "focus:ring-red-500"}`}
                />
                {errors.customer && touched.customer && (
                  <div className="ml-6 mt-2.5 rounded-lg bg-red-100 px-4 py-2 font-semibold text-red-700">
                    {errors.customer}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-5 flex flex-col flex-wrap gap-4 sm:flex-row sm:items-baseline">
              <label className="min-w-32">Phone number</label>
              <div className="sm:flex sm:flex-1 sm:flex-col">
                <Field
                  type="tel"
                  name="phone"
                  className={`input sm:flex-1 ${errors.phone && touched.phone && "focus:ring-red-500"}`}
                />
                {errors.phone && touched.phone && (
                  <div className="ml-6 mt-2.5 rounded-lg bg-red-100 px-4 py-2 font-semibold text-red-700">
                    {errors.phone}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-5 flex flex-col flex-wrap gap-4 sm:flex-row sm:items-baseline">
              <label className="min-w-32">Address</label>
              <div className="sm:flex sm:flex-1 sm:flex-col">
                <div
                  className="relative"
                  onMouseOut={() => setFieldValue("address", address)}
                >
                  <Field
                    type="text"
                    name="address"
                    disabled={isLoading}
                    value={address}
                    className={`input sm:flex-1 ${errors.address && touched.address && "focus:ring-red-500"}`}
                  />
                  {!address && (
                    <Button
                      type="location"
                      onClick={() => handleAddress()}
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Get Position"}
                    </Button>
                  )}
                </div>
                {((errors.address && touched.address) || errorPosition) && (
                  <div className="ml-6 mt-2.5 rounded-lg bg-red-100 px-4 py-2 font-semibold text-red-700">
                    {errors.address || errorPosition}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-12 flex items-center gap-4">
              <Field
                type="checkbox"
                id="priority"
                name="priority"
                className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2"
                checked={values.priority}
                onChange={handleisPrioriry(setFieldValue)}
              />

              <label htmlFor="priority" className="m-0">
                Want to yo give your order priority?
              </label>
            </div>

            <Button type="primary" disabled={isSubmitting}>
              {isSubmitting
                ? "Placing order..."
                : `Order now From $${totalPriceWithPriority().toFixed(2)}`}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateOrder;
