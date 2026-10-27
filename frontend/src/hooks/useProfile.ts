import { useCallback, useEffect, useState } from "react";
import { getProfile } from "../api/profile";
import type { ProfileResponse } from "../types/profile";

interface ProfileState {
  profile: ProfileResponse | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  isLoading: true,
  error: null,
};

export function useProfile(count = 5) {
  const [state, setState] = useState<ProfileState>(initialState);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    getProfile(count, controller.signal)
      .then((profile) => {
        setState({ profile, isLoading: false, error: null });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setState({
          profile: null,
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
