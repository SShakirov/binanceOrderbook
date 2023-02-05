
/** Клас для представления пользователя. */
export class WebSocketWrapper {
  public socket: WebSocket | undefined;

  /** Конструктор */
  public constructor() {
    this.socket = undefined;
  }

  /**
   * Метод инициализации сокета
   * @param {String} url - Ссылка на сокет
   * @param {Function} onMessageFunc - Функция при получения данных.
   * @param {Function} onOpenFunc - Функция при закрытии подключения.
   * @param {Function} onCloseFunc - Функция при закрытии подключения.
   */
  public init(url: string,
      onMessageFunc: ((data: any) => void) | null,
      onOpenFunc?: (() => void),
      onCloseFunc?: ((error: Event) => void) | null): void {
    this.socket = new WebSocket(url);
    this.socket.onmessage = function(data) {
      const jsonData = JSON.parse(data.data);
      if (onMessageFunc) onMessageFunc(jsonData);
    };

    this.socket.onopen = function() {
      if (onOpenFunc) onOpenFunc();
      console.log('socket opened');
    };

    this.socket.onclose = function(error) {
      console.error('Socket closed unexpectedly. ', error);
      if (onCloseFunc) onCloseFunc(error);
    };

    this.socket.onerror = function(error) {
      console.error('Socket error', error);
    };
  }

  /**
   * Отправить объект через сокет
   * @param {Object} data - Объект, который необходимо отправить по сокету
   */
  public send(data: unknown): void {
    const jsonData = JSON.stringify(data);
    this.socket?.send(jsonData);
  }

  /**
   * Метод для закрытия сокета
   */
  public close(): void {
    this.socket?.close();
  }
}

