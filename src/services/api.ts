import ky from "ky";
import { useAuthStore } from "@/stores/auth-store";

export const api = ky.create({
  prefix: import.meta.env.VITE_API_URL || "http://localhost:3000",
  hooks: {
    beforeRequest: [
      ({ request }) => {
        const token = useAuthStore.getState().token;
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});

export type ApiClient = typeof api;
