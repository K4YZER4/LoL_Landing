import { useEffect, useState } from "react";
import { getAccount } from "../api/account";
import type { AccountResponse } from "../types/account";

export function useAccount(): AccountResponse | null {
  const [account, setAccount] = useState<AccountResponse | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    getAccount(controller.signal)
      .then(setAccount)
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      });

    return () => controller.abort();
  }, []);

  return account;
}
