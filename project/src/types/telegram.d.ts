declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready(): void;
        close(): void;
        expand(): void;
        MainButton: {
          text: string;
          show(): void;
          hide(): void;
          onClick(callback: () => void): void;
        };
        showPopup(params: {
          title?: string;
          message: string;
          buttons?: Array<{ type: string; text: string }>;
        }): void;
      };
    };
  }
}