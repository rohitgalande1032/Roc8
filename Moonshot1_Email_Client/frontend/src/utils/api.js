const BASE_URL = 'https://flipkart-email-mock.now.sh';

export const getEmails = async (page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/?page=${page}`);
    if (!response.ok) {
      throw new Error(`Error fetching emails: ${response.statusText}`);
    }
    const data = await response.json();
    return data.list;
  } catch (error) {
    console.error(error);
  }
};

export const getEmailBody = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/?id=${id}`)
      if (!response.ok) {
        throw new Error(`Error fetching email body for id ${id}: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };