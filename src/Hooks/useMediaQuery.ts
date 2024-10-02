import { useState, useEffect } from "react";

export enum EMediaQuery {
  MOBILE = "(min-width: 0px)",
  SMALL = "(min-width: 768px)",
  BIG = "(min-width: 1060px)",
}

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
};

export default useMediaQuery;
