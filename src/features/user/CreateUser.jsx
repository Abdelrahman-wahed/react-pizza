import { useState } from "react";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { createName } from "./userSlice";
import { useNavigate } from "react-router-dom";
function CreateUser() {
  const { fullName } = useSelector((store) => store.user);
  const [username, setUsername] = useState(fullName);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;
    !fullName && dispatch(createName(username));
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      {!fullName && (
        <>
          <p className="mb-4 text-sm text-stone-600 md:text-base">
            👋 Welcome! Please start by telling us your name:
          </p>

          <input
            type="text"
            placeholder="Your full name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input mb-8 w-72"
          />
        </>
      )}

      {(username !== "" || fullName) && (
        <div>
          <Button type="primary">
            {fullName ? `Continue ordering, ${fullName}` : "Start ordering"}
          </Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
