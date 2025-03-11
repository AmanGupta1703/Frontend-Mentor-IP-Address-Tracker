import { useState, useEffect } from "react";

import { IP_DOMAIN, IP_REGEX, startsWithNumber } from "../utils";
import { APIKEY, APIURL } from "../../config/env";

function useFetch(ipAddress) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const queryKey = startsWithNumber.test(ipAddress) ? "ipAddress" : "domain";

  const url = `${APIURL}/country,city?apiKey=${APIKEY}&${queryKey}=${ipAddress}`;

  useEffect(
    function () {
      if (!ipAddress) return;

      if (queryKey === "domain") {
        if (!IP_DOMAIN.test(ipAddress)) return;
      } else {
        if (!IP_REGEX.test(ipAddress)) return;
      }

      const controller = new AbortController();
      const signal = controller.signal;

      async function fetchData() {
        setError(null);
        setLoading(true);

        try {
          const response = await fetch(url, { signal });

          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }

          const result = await response.json();

          if (data.code === 403) {
            throw new Error(data.messages);
          }

          setData(result);
        } catch (error) {
          if (error.name === "AbortError") {
            console.log("Fetch Aborted");
          } else {
            setError(error);
          }
        } finally {
          setLoading(false);
        }
      }

      if (IP_REGEX.test(ipAddress) || IP_DOMAIN.test(ipAddress)) {
        fetchData();
      }

      return function () {
        controller.abort();
      };
    },
    [url],
  );

  return { data, error, loading };
}

export { useFetch };
