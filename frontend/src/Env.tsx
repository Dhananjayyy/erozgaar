const production = {
  url: "https://erozgaar.azurewebsites.net",
};

const development = {
  url: "http://localhost:5173",
};

export const config =
  process.env.NODE_ENV === "development" ? development : production;
