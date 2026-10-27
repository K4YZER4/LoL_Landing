import { useCallback, useEffect, useState } from "react";
import { getMatches } from "../api/matches";
import type { MatchViewModel } from "../types/profile";

interface MatchesState {
  matches: MatchViewModel[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MatchesState = {
  matches: [],
  isLoading: true,
  error: null,
};

export function useMatches(count = 20) {
  const [state, setState] = useState<MatchesState>(initialState);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    getMatches(count, 0, controller.signal)
      .then((matches) => {
        setState({ matches, isLoading: false, error: null });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setState({
          matches: [],
          isLoading: false,
          error:
            error instanceof Error ? error.message : "Unknown API error",
        });
      });

    return () => controller.abort();
  }, [count, reloadToken]);

  const reload = useCallback(() => {
    setState((current) => ({
      ...current,
      isLoading: true,
      error: null,
    }));
    setReloadToken((token) => token + 1);
  }, []);

  return { ...state, reload };
}
