import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [whoami, setWhoami] = useState("I dont't know!");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/account/whoami/", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setWhoami(data.username);
      })
      .catch((err) => {
        console.log(err);
        setError("You are not logged in");
      });
  }, []);

  return <div className="container">{whoami}</div>;
};

export default Dashboard;