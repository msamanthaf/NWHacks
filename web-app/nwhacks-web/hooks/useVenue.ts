import { getVenue, Mappedin, TGetVenueOptions } from "@mappedin/mappedin-js";
import { useEffect, useState } from "react";

/**
 * Declarative API to fetch Mappedin data using getVenue
 */
export default function useVenue(options: TGetVenueOptions) {
  // Store the venue object in a state variable
  const [venue, setVenue] = useState<Mappedin | undefined>();

  // Fetch data asynchronously whenever options are changed
  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        const data = await getVenue(options);
        // Update state variable after data is fetched
        if (!ignore) {
          setVenue(data);
        }
      } catch (e) {
        // Handle error
        console.log(e);
        setVenue(undefined);
      }
    };
    fetchData();

    return () => {
      ignore = true;
    };
  }, [options]);

  // Return the venue object
  return venue;
}
