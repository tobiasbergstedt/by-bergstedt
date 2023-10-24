import { fixUrl } from '@utils';

export const fetchData = async (
  url: string,
  setData: (data: any) => void,
): Promise<void> => {
  try {
    const response = await fetch(fixUrl(url));
    const apiData = await response.json();
    setData(apiData.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const fetchSingleItem = async (
  url: string,
  setData: (data: any) => void,
): Promise<void> => {
  try {
    const response = await fetch(fixUrl(url));
    const apiData = await response.json();
    setData(apiData.data[0]);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
