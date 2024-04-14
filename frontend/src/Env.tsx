const production = {
  url: "https://erozgaar.azurewebsites.net",
};

const development = {
  url: "http://localhost:8080",
};

export const config =
  process.env.NODE_ENV === "development" ? development : production;
