import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import "./index.css";
import App from "./App.tsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (
  !PUBLISHABLE_KEY ||
  PUBLISHABLE_KEY === "pk_test_YOUR_CLERK_PUBLISHABLE_KEY"
) {
  console.warn(
    "Lütfen .env.local dosyasındaki VITE_CLERK_PUBLISHABLE_KEY değerini Clerk Dashboard'ınızdan aldığınız key ile güncelleyin.",
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider
      appearance={{ baseTheme: dark }}
      publishableKey={PUBLISHABLE_KEY || ""}
      afterSignOutUrl="/"
    >
      <App />
    </ClerkProvider>
  </StrictMode>,
);
