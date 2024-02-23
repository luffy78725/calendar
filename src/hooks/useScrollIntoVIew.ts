import { useEffect } from "react";

export default function useScrollIntoView(
  element: HTMLElement | null,
  dependencyArray: any[] = []
) {
  useEffect(() => {
    element?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencyArray, element]);
}
