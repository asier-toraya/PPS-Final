const requiredKeys = [
  "PORT",
  "CORS_ORIGIN",
  "SUPABASE_URL",
  "SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY"
] as const;

type RequiredKey = (typeof requiredKeys)[number];

function readRequired(key: RequiredKey): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}

function readOrigins() {
  return readRequired("CORS_ORIGIN")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export const env = {
  port: Number.parseInt(readRequired("PORT"), 10),
  corsOrigins: readOrigins(),
  supabaseUrl: readRequired("SUPABASE_URL"),
  supabaseAnonKey: readRequired("SUPABASE_ANON_KEY"),
  supabaseServiceRoleKey: readRequired("SUPABASE_SERVICE_ROLE_KEY"),
  bootstrapAdminEmail: process.env.BOOTSTRAP_ADMIN_EMAIL?.toLowerCase() ?? ""
};

