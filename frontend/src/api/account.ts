import type { AccountResponse } from "../types/account";
import { apiFetch } from "./client";

export function getAccount(signal?: AbortSignal): Promise<AccountResponse> {
  return apiFetch<AccountResponse>("/account/me", signal);
}
