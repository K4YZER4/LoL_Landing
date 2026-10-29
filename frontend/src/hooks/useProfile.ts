import { useCallback, useEffect, useState } from "react";
import { getProfile } from "../api/profile";
import { DEMO_PROFILE } from "../data/demo";
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

        console.warn(
          "No se pudo cargar el perfil; se usa el snapshot de demostración.",
          error,
        );
        setState({
          profile: DEMO_PROFILE,
          isLoading: false,
          error: null,
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
