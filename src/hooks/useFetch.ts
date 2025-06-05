import { useState, useEffect } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/**
 * A custom React hook that manages the state of an asynchronous fetch operation.
 *
 * The `useFetch` hook accepts a fetch function and returns the current state of the fetch
 * operation, including the data, loading status, and any error encountered.
 *
 * @template T The type of the data returned by the fetch function.
 * @param {() => Promise<T>} fetchFn A function that performs the fetch operation and returns a promise.
 * @returns {FetchState<T>} The state of the fetch operation, including
 * - `data`: The fetched data of type `T`, or `null` if the operation is pending or fails.
 * - `loading`: A boolean that indicates whether the fetch operation is still in progress.
 * - `error`: An instance of `Error`, or `null` if no error has occurred.
 */
export const useFetch = <T>(fetchFn: () => Promise<T>): FetchState<T> => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFn();
        setState({
          data,
          loading: false,
          error: null,
        });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error:
            error instanceof Error
              ? error
              : new Error("An unknown error occurred"),
        });
      }
    };

    fetchData();
  }, [fetchFn]);

  return state;
};
