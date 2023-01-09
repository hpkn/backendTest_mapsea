export const errorMessageHandler = (status: number, message: string | null) => {
    switch (status) {
      case 400:
        return {
          type: "ValidationError",
          message: {
            en: `Invalid Parameters: ${message}`,
            kr: `잘못된 매개 변수 : ${message}`,
            jp: `無効なパラメーター： ${message}`,
          },
        };
      case 403:
        return {
          type: "PermissionDeniedError",
          message: {
            en: `Message: ${message}`,
            kr: `Message: ${message}`,
            jp: `Message： ${message}`,
          },
        };
      case 500:
        return {
          type: "ServerError",
          message: { en: "Internal server error", kr: "인터넷 서버 오류", jp: "内部サーバーエラー" },
          error: message,
        };
      case 404:
        return {
          type: "NotFound",
          error: message,
        };
      default:
        return {
          type: "ServerError",
          message: { en: "Internal server error", kr: "인터넷 서버 오류", jp: "内部サーバーエラー" },
          error: message,
        };
    }
  };