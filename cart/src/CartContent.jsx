import React, { useState, useEffect } from "react";
import MiniCart from "./MiniCart";

import { jwt } from "./cart";
import Login from "./Login";

export default function CartContent() {
  const [token, setToken] = useState("");

  useEffect(() => {
    jwt.subscribe((val) => setToken(val ?? ""));
  }, []);

  return (
    <div>
      <div>JWT: {token} </div>
      <Login />
      <MiniCart />
    </div>
  );
}
