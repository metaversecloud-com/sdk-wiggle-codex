export const errorHandler = ({ credentials, error, functionName, message }) => {
  try {
    if (process.env.NODE_ENV === "development") console.log("Error:", error);
    else {
      if (credentials?.interactiveNonce) delete credentials.interactiveNonce;

      console.error(
        JSON.stringify({
          errorContext: {
            message,
            functionName,
          },
          requestContext: {
            credentials,
          },
          error: JSON.stringify(error),
        }),
      );

      return { error };
    }
  } catch (e) {
    console.error("❌ Error printing the logs", e);
    return { e };
  }
};
