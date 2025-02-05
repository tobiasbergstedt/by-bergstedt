import { type ShoppingCartItem } from '@interfaces/interfaces';
import fixUrl from '@utils/fix-url';

export const fetchData = async (
  setStateArrays: Array<{
    url: string;
    setData: (data: any) => void;
    errorMessage: string;
    fetchSingleItem?: boolean;
    isExternalApiCall?: boolean;
    setMetaData?: (data: any) => void;
  }>,
  setIsLoading: (data: boolean) => void,
  setApiError: (data: string) => void,
): Promise<void> => {
  const errorMessages: string[] = [];

  try {
    setIsLoading(true); // Set isLoading to true before making API calls

    const fetchPromises = setStateArrays.map(async (stateArray) => {
      try {
        const response = await fetch(
          stateArray.isExternalApiCall ?? false
            ? stateArray.url
            : fixUrl(stateArray.url),
        );

        if (!response.ok) {
          // Throw an error if response status is not ok
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const apiData = await response.json();

        if (apiData.data !== null && apiData.data.length !== 0) {
          stateArray.setData(
            stateArray.fetchSingleItem ?? false
              ? apiData.data[0]
              : apiData.data,
          );
        } else {
          // hasError = true; // Set the hasError flag if no data is available
          errorMessages.push(stateArray.errorMessage + ' - No data available');
        }

        if (apiData.meta !== null && stateArray.setMetaData != null) {
          stateArray.setMetaData(apiData.meta);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Type guard to check if error is an instance of Error
        if (error instanceof Error) {
          errorMessages.push(stateArray.errorMessage + ' - ' + error.message);
        } else {
          // Handle cases where the error is not an instance of Error
          errorMessages.push(stateArray.errorMessage + ' - Unexpected error');
        }
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
  } catch (error) {
    console.error('Global error in fetchData:', error);
    setApiError('An unexpected error occurred');
  } finally {
    setIsLoading(false);
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

export const postData = async (
  url: string,
  data: {
    totalSum: number;
    shipping: number;
    userData: {
      name: string;
      company: string;
      address: string;
      phoneNumber: string;
      email: string;
      message: string;
    };
    orderDetails: ShoppingCartItem[] | null;
    shippingInfo: string;
    paymentMethod: string;
    orderId: string;
  },
  setIsLoading: (data: boolean) => void,
  setApiSuccess: (data: string) => void,
  setApiError: (data: any) => void,
): Promise<void> => {
  try {
    setIsLoading(true);

    const response = await fetch(fixUrl(url), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // eslint-disable-next-line object-shorthand
      body: JSON.stringify({ data: data }),
    });

    if (!response.ok) {
      console.log(response);
      throw new Error('Network response was not ok');
    }

    const apiData = await response.json();

    // Handle the API response upon success
    setApiSuccess(apiData.message);

    setIsLoading(false);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error posting data:', error);
      setApiError(error);
    } else if (error instanceof Response) {
      await error.json().then((json) => {
        console.error('Error from API:', json);
        setApiError(json);
      });
    }
    setIsLoading(false);
  }
};

export const updateObjectAmount = async (
  url: string,
  newAmount: number,
  setIsLoading: (data: boolean) => void,
  setApiSuccess: (data: string) => void,
  setApiError: (data: string) => void,
): Promise<void> => {
  try {
    const data = {
      amount: newAmount,
    };

    const response = await fetch(fixUrl(url), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      console.log(response);

      throw new Error('Network response was not ok');
    }

    const apiData = await response.json();

    // Handle the API response upon success
    setApiSuccess(apiData.message);

    setIsLoading(false);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error posting data:', error);
      setApiError(JSON.stringify(error));
    } else if (error instanceof Response) {
      await error.json().then((json) => {
        console.error('Error from API:', json);
        setApiError(json);
      });
    }
    setIsLoading(false);
  }
};
