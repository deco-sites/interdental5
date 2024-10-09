import { useCallback, useEffect } from "preact/hooks";
import { signal } from "@preact/signals";
import { invoke } from "../runtime.ts";

type TopSearches = {
  term: string;
  count: number;
};

type LoaderResponse = {
  searches: TopSearches[];
};

const topSearchesLoader = invoke.vtex.loaders.intelligentSearch
  .topsearches as unknown as () => Promise<LoaderResponse>;

const topSearches = signal<TopSearches[]>([]);
const loading = signal<boolean>(false);

export const useTopSearches = () => {
  const fetchTopSearches = useCallback(async () => {
    loading.value = true;

    try {
      const response = await topSearchesLoader();
      topSearches.value = response.searches;
    } catch (error) {
      console.error("Error fetching top searches");
      console.error(error);
    }

    loading.value = false;
  }, []);

  useEffect(() => {
    fetchTopSearches();
  }, []);

  return {
    topSearches,
    loading,
  };
};
