interface StorageData {
  userId: string;
  coins: number;
  history: {
    timestamp: number;
    bet: number;
    multiplier: number;
    won: number;
  }[];
}

export class TelegramStorage {
  private static channelId: string = process.env.TELEGRAM_CHANNEL_ID || '';
  private static botToken: string = process.env.TELEGRAM_BOT_TOKEN || '';

  static async saveUserData(data: StorageData): Promise<boolean> {
    try {
      const message = JSON.stringify(data);
      const response = await fetch(`https://api.telegram.org/bot${this.botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: this.channelId,
          text: message,
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('Error saving data:', error);
      return false;
    }
  }

  static async getUserData(userId: string): Promise<StorageData | null> {
    try {
      const response = await fetch(
        `https://api.telegram.org/bot${this.botToken}/getChat?chat_id=${this.channelId}`
      );
      
      if (!response.ok) return null;

      const messages = await response.json();
      const userMessage = messages.result.find((msg: any) => {
        try {
          const data = JSON.parse(msg.text);
          return data.userId === userId;
        } catch {
          return false;
        }
      });

      if (!userMessage) return null;

      return JSON.parse(userMessage.text);
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  }
}