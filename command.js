// Отключение автоматического завершения теста при необработанных ошибках
Cypress.on("uncaught:exception", (err, runnable) => {
  // Вывод ошибки в консоль без завершения теста
  console.error("Unhandled Exception:", err);
  return false;
});
