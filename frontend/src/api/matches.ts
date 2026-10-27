import type { MatchViewModel } from "../types/profile";
import { apiFetch } from "./client";

export function getMatches(
  count = 20,
  start = 0,
  signal?: AbortSignal,
): Promise<MatchViewModel[]> {
  const safeCount = Math.min(20, Math.max(1, Math.trunc(count)));
  const safeStart = Math.max(0, Math.trunc(start));

  return apiFetch<MatchViewModel[]>(
    `/matches?count=${safeCount}&start=${safeStart}`,
    signal,
  );
}
