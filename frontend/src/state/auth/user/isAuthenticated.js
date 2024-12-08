export const isAuthenticated = () => {
  if (typeof window === "undefined") return null;

  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    try {
      return JSON.parse(jwt);
    } catch (err) {
      console.error("Error parsing JWT:", err);
      return null;
    }
  } else {
    return null;
  }
};

export const authenticate = (data, cb) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("jwt", JSON.stringify(data));
    cb && cb();
  }
};

export const signout = (cb) => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("jwt");
    cb && cb();
  }
};
