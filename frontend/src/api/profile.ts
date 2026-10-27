import type { ProfileResponse } from "../types/profile";
import { apiFetch } from "./client";

export function getProfile(
  count = 5,
  signal?: AbortSignal,
): Promise<ProfileResponse> {
  const safeCount = Math.min(10, Math.max(0, count));

  return apiFetch<ProfileResponse>(`/profile?count=${safeCount}`, signal);
}
