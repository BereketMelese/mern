module.exports = {
  apps: [
    {
      name: "mern-api",
      script: "dist/index.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 4000,
        DATABASE_URL: process.env.DATABASE_URL || "file:/data/dev.db",
        JWT_SECRET: process.env.JWT_SECRET || "change-me-in-production",
        CORS_ORIGIN:
          process.env.CORS_ORIGIN ||
          "http://localhost:8080,http://localhost:5173",
      },
      time: true,
      merge_logs: true,
      out_file: "/dev/stdout",
      error_file: "/dev/stderr",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
    },
  ],
};
