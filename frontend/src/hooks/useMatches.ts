import { useCallback, useEffect, useState } from "react";
import { getMatches } from "../api/matches";
import { DEMO_MATCHES } from "../data/demo";
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

export function useMatches(count = 20, enabled = true) {
  const [state, setState] = useState<MatchesState>(initialState);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();

    getMatches(count, 0, controller.signal)
      .then((matches) => {
        setState({ matches, isLoading: false, error: null });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        console.warn(
          "No se pudieron cargar las partidas; se usa el snapshot de demostración.",
          error,
        );
        setState({
          matches: DEMO_MATCHES,
          isLoading: false,
          error: null,
        });
      });

    return () => controller.abort();
  }, [count, enabled, reloadToken]);

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
