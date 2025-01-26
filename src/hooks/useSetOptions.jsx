import { useState, useEffect } from "react";
import { getSetOptions } from "../api/api"; // Import the API function

const useSetOptions = (setId) => {
  const [setOptions, setSetOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!setId) return; // Don't fetch if no setId is provided

    const fetchSetOptions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const options = await getSetOptions(setId);
        setSetOptions(options);
      } catch (err) {
        setError(err.message || "Грешка при зареждане на опциите за комплекта.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSetOptions();
  }, [setId]);

  return { setOptions, isLoading, error };
};

export default useSetOptions;
