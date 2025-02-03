import { useSelector } from "react-redux";

function UserName() {
  const {fullName} = useSelector(store=>store.user)
  return (
    <div className="hidden text-sm font-semibold md:block">{fullName}</div>
  );
}

export default UserName;
