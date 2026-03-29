export const checkRequiredEnv = () => {
  const requiredVars = [
    "PORT",
    "MONGO_URI",
    "JWT_SECRET",
    "JWT_REFRESH_SECRET"
  ];

  const missingVars = requiredVars.filter((key) => !process.env[key]);

  if (missingVars.length > 0) {
    console.error(" Missing required ENV variables:\n");

    missingVars.forEach((key) => {
      console.error(`${key} is not defined`);
    });

    console.error("Please add them in your .env file\n");

    process.exit(1); // Stop server immediately
  }

  console.log("All required ENV variables are set");
};