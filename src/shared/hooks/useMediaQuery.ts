import { useCallback, useSyncExternalStore } from "react";

export function useMediaQuery(
  query: string,
  initialMatches = false,
  onChange?: (matches: boolean) => void,
) {
  const getSnapshot = useCallback(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function"
    ) {
      return initialMatches;
    }

    return window.matchMedia(query).matches;
  }, [initialMatches, query]);

  const subscribe = useCallback(
    (notify: () => void) => {
      if (
        typeof window === "undefined" ||
        typeof window.matchMedia !== "function"
      ) {
        return () => undefined;
      }

      const mediaQueryList = window.matchMedia(query);

      const handleChange = (event: MediaQueryListEvent) => {
        onChange?.(event.matches);
        notify();
      };

      mediaQueryList.addEventListener("change", handleChange);

      return () => {
        mediaQueryList.removeEventListener("change", handleChange);
      };
    },
    [onChange, query],
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => initialMatches);
}
