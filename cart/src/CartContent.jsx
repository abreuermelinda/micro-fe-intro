import React, { useState, useEffect } from "react";

import { login, jwt } from "./cart";

export default function CartContent() {
  const [token, setToken] = useState("");

  useEffect(() => {
    login("saly", "123");
    return jwt.subscribe((val) => setToken(val ?? ""));
  }, []);

  return <div>JWT: {token}</div>;
}
