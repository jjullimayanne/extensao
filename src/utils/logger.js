const axios = require('axios');

class Logger {
  /**
   * Envia um log de erro para Datadog e registra localmente.
   * @param {string} service - Nome do serviço onde ocorreu o erro.
   * @param {Error} error - Objeto de erro capturado.
   * @param {object} [context] - Contexto adicional do log (opcional).
   */
  static async logError(service, error, context = {}) {
    const log = {
      service,
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
    };

    // Log local (console)
    console.error(`[${log.timestamp}] [${log.service}] Error: ${log.message}`);
    console.error(log.stack);

    // Enviar para Datadog (ou outro serviço de monitoramento)
    try {
      await axios.post(process.env.LOGGING_SERVICE_URL, log, {
        headers: {
          'Content-Type': 'application/json',
          'DD-API-KEY': process.env.DATADOG_API_KEY, // Chave da API do Datadog
        },
      });
    } catch (loggingError) {
      console.error('Failed to send log to external service:', loggingError.message);
    }
  }
}

module.exports = Logger;
