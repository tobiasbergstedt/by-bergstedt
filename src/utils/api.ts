import { fixUrl } from '@utils';

export const fetchData = async (
  setStateArrays: Array<{
    url: string;
    setData: (data: any) => void;
    errorMessage: string;
    fetchSingleItem?: boolean;
  }>,
  setIsLoading: (data: boolean) => void,
  setApiError: (data: string) => void,
): Promise<void> => {
  const errorMessages: string[] = [];

  try {
    setIsLoading(true); // Set isLoading to true before making API calls
    // let hasError = false;

    // Create an array of Promises for fetching and setting data
    const fetchPromises = setStateArrays.map(async (stateArray) => {
      try {
        const response = await fetch(fixUrl(stateArray.url));
        const apiData = await response.json();

        if (apiData.data !== null && apiData.data.length !== 0) {
          stateArray.setData(
            stateArray.fetchSingleItem ?? false
              ? apiData.data[0]
              : apiData.data,
          );
        } else {
          // hasError = true; // Set the hasError flag if no data is available
          errorMessages.push(stateArray.errorMessage);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // hasError = true; // Set the hasError flag on error
        errorMessages.push(stateArray.errorMessage);
      }
    });

    // Wait for all Promises to resolve
    await Promise.all(fetchPromises);

    const errorMessage = errorMessages.join('\n'); // Combine error messages into a single string

    if (errorMessage.length !== 0) {
      setApiError(errorMessage); // Set API error flag if there was an error
    } else {
      setApiError('');
    }

    setIsLoading(false); // Set isLoading to false after all API calls are done
  } catch (error) {
    console.error('Error in fetchData:', error);
    setApiError(errorMessages.join('\n'));
  }
};

export const fetchSingleItem = async (
  url: string,
  setData: (data: any) => void,
  setApiError: (data: boolean) => void,
): Promise<void> => {
  try {
    const response = await fetch(fixUrl(url));
    const apiData = await response.json();
    if (apiData.data.length !== 0) {
      setData(apiData.data[0]);
      setApiError(false);
    } else {
      setApiError(true);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
