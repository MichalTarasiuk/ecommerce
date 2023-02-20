export const getDefaultValues = (parsedUrlQuery: {readonly email?: string}) => {
  if (parsedUrlQuery.email) {
    return {
      email: parsedUrlQuery.email,
    };
  }

  return {};
};

export const getToken = (parsedUrlQuery: {readonly token?: string}) => {
  const maybeToken = parsedUrlQuery.token;

  if (maybeToken) {
    return parsedUrlQuery.token;
  }

  return null;
};
