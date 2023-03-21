import React, { useCallback } from "react";

const addUsersBulk = async () => {
  await fetch(`${process.env.REACT_APP_BASE_URL}/users`, {
    method: "POST",
  });
};

export default function AddUsers({ refetch }) {
  const onClick = useCallback(() => {
    addUsersBulk().then(refetch);
  }, [refetch]);
  return <button onClick={onClick}>Add Users</button>;
}
