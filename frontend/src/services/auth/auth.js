// const { API_URL } = require("../config");

// const signupRequest = async (user) => {
//   console.log(user);
//   try {
//     const res = await fetch(`http://localhost:8000/api/auth/signup`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },

//       body: JSON.stringify(user),
//     });
//     return await res.json();
//   } catch (err) {
//     console.log(err);
//     throw new Error("Signup failed");
//   }
// };

// const signinRequest = async (user) => {
//   try {
//     const res = await fetch(`http://localhost:8000/api/auth/signin`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(user),
//     });
//     return await res.json();
//   } catch (err) {
//     console.log(err);
//     throw new Error("Signin failed");
//   }
// };

// // Signup function for user registration
// export const signup = (user) => signupRequest(user);

// // Signin function for user login
// export const signin = (user) => signinRequest(user);

// export const authenticate = (data, cb) => {
//   window.localStorage.setItem("jwt", JSON.stringify(data));
//   cb();
// };

// export const signout = async (cb) => {
//   window.localStorage.removeItem("jwt");
//   cb();
//   try {
//     const res = await fetch(`http://localhost:8000/api/auth/signout`);
//     return console.log("signout", res);
//   } catch (err) {
//     return console.log(err);
//   }
// };

// export const isAuthenticated = () => {
//   if (window.localStorage.getItem("jwt")) {
//     return JSON.parse(localStorage.getItem("jwt"));
//   } else {
//     return false;
//   }
// };

// const API_URL = "http://localhost:8000/api/auth";

export const signupRequest = async (user) => {
  try {
    const res = await fetch(`http://localhost:8000/api/auth/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (err) {
    console.error("Signup request failed:", err);
    throw new Error("Signup failed");
  }
};

export const signinRequest = async (user) => {
  try {
    const res = await fetch(`http://localhost:8000/api/auth/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (err) {
    console.error("Signin request failed:", err);
    throw new Error("Signin failed");
  }
};
