// 1. Сначала объявляем все переменные
const orderDialog = document.getElementById('order-dialog');
const closeDialogButton = document.getElementById('close-order-dialog'); // <-- ВОТ ЭТОЙ СТРОКИ НЕ ХВАТАЛО
const orderButtons = document.querySelectorAll('.product-card__button');
const selectedProductInput = document.getElementById('selected-product');

// 2. Открытие модального окна по кнопкам «Заказать»
if (orderButtons.length > 0) {
  orderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const productName = button.getAttribute('data-product');
      if (selectedProductInput && productName) {
        selectedProductInput.value = productName;
      }
      if (orderDialog) {
        orderDialog.showModal();
      }
    });
  });
}

// 3. Закрытие модального окна по кнопке «Закрыть»
if (closeDialogButton && orderDialog) {
  closeDialogButton.addEventListener('click', () => {
    orderDialog.close();
  });
}
// Получаем форму заявки.
const orderForm = document.getElementById('order-form');

// Получаем сообщение об успешной отправке.
const successMessage = document.getElementById('success-message');

// Обрабатываем отправку формы.
orderForm.addEventListener('submit', (event) => {
  // Отменяем стандартную отправку формы,
  // потому что backend пока не подключён.
  event.preventDefault();

  // Сбрасываем предыдущие признаки ошибок.
  const formElements = Array.from(orderForm.elements);

  formElements.forEach((element) => {
    if (element.willValidate) {
      element.removeAttribute('aria-invalid');
    }
  });

  // Проверяем встроенные HTML-ограничения формы.
  if (!orderForm.checkValidity()) {
    formElements.forEach((element) => {
      if (element.willValidate && !element.checkValidity()) {
        element.setAttribute('aria-invalid', 'true');
      }
    });

    // Показываем стандартные сообщения браузера.
    orderForm.reportValidity();
    return;
  }

  // Показываем сообщение об успешной отправке.
  successMessage.hidden = false;

  // Очищаем форму.
  orderForm.reset();

  // Закрываем модальное окно.
  orderDialog.close();
});