import { Link } from "react-router-dom";

function Button({ to, children, disabled, type ,onClick  }) {
  const base =
    "inline-block text-sm rounded-full bg-yellow-400  font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-150 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2 disabled:cursor-not-allowed";
  const styles = {
    primary: base + " px-6 py-4 text-sm md:px-6 md:py-4",
    small: base + " px-5 py-2.5 text-xs sm:px-3 sm:py-2",
    gray: " text-sm inline-block rounded-full border-2 border-stone-300 bg-transparent px-6 py-4 text-sm font-semibold uppercase tracking-wide focus:text-stone-800 hover:text-stone-800 text-stone-400 transition-colors duration-300 hover:bg-stone-300 focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed md:px-6 md:py-4",
    location:base + " px-5 py-2.5 text-xs sm:px-3 sm:py-2 w-fit top-1/2 right-0 -translate-y-1/2 absolute mr-[6px]"
  };
  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  return (
    <button disabled={disabled} className={styles[type]} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
