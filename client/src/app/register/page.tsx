"use client";
import React, { useState } from "react";

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log("Funker jo");
};

const RegisterPage = () => {
  const [formData, setFormData] = useState({});

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" />
        <label htmlFor="username">Username</label>
        <input type="text" name="username" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default RegisterPage;
