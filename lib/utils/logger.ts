type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
  private isProduction = process.env.NODE_ENV === 'production';

  private log(level: LogLevel, message: string, data?: any) {
    if (this.isProduction && level === 'debug') {
      return;
    }

    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

    switch (level) {
      case 'error':
        console.error(logMessage, data || '');
        break;
      case 'warn':
        console.warn(logMessage, data || '');
        break;
      case 'info':
        if (!this.isProduction) {
          console.info(logMessage, data || '');
        }
        break;
      case 'debug':
        console.debug(logMessage, data || '');
        break;
    }
  }

  info(message: string, data?: any) {
    this.log('info', message, data);
  }

  warn(message: string, data?: any) {
    this.log('warn', message, data);
  }

  error(message: string, data?: any) {
    this.log('error', message, data);
  }

  debug(message: string, data?: any) {
    this.log('debug', message, data);
  }
}

export const logger = new Logger();
