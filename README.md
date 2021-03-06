# Калькулятор налогового вычета

[Опубликованное решение](https://kopniiiin.github.io/tax-deduction-calculator-build/)

---

Команды:
* `npm i` - установка зависимостей
* `npm run start` - локальный сервер для разработки
* `npm run build` - сборка бандла в продакшн
* `npm run test` - проверка кода линтерами

---

Инструменты:
* React (хуки без классовых компонентов)
* TypeScript (типы, интерфейсы и перечисления)
* Sass (синтаксис SCSS)
* Grid Layout
* БЭМ
* stylelint (конфиг от HTML Academy)
* ESLint (конфиг от Google)
* webpack (конфиг от меня 🙂)

---

Важные моменты:
* Добавлено поле стоимости квартиры (по условию задания этот фактор влияет на сумму вычета)
* На денежные поля наложены ограничения:
  * Поля обязательны для заполнения
  * Стоимость квартиры - от 100 000 ₽ до 10 000 000 ₽
  * Зарплата - от 10 000 ₽ до 400 000 ₽
* При нарушении ограничений отображаются сообщения
* Денежные поля обновляют состояние приложения при расфокусе (событие blur)
* При выборе платежа автоматически выбираются все предыдущие платежи
* Для совершения вычета необходимо выбрать один или более платежей
* Модальное окно закрывается кликом по крестику, кликом по фону, нажатием клавиши `Esc`

---

Желаю приятной проверки решения

С удовольствием приму замечания и предложения по улучшению
