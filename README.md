# Avanti — личный кабинет (Vue 3)

Вёрстка из Figma «Личный кабинет»: профиль, смена имени, email, пароля, подтверждение email. ПК + мобильная версия.

- Vue 3, `<script setup>` (Composition API), Vite, vue-router
- Один компонент = один файл, имя `avanti_<назначение>.vue`, каждый файл < 300 строк
- Без inline JS/CSS: стили в `<style scoped>`, токены в `resources/css/app.css`
- Шрифт Inter подключён локально (`@fontsource/inter`)

## Запуск отдельно (mock-данные)

```bash
npm install
npm run dev
```

Такая же сборка уходит на Vercel (`vercel.json`, выход — `dist`). API подменяется mock-данными (`resources/js/data/avanti_mock_profile.js`).

## Подключение к Laravel

Структура папок уже как в Laravel, файлы просто копируются в проект:

| Отсюда | В Laravel |
| --- | --- |
| `resources/js`, `resources/css` | `resources/js`, `resources/css` |
| `resources/views/app.blade.php` | `resources/views/app.blade.php` |
| `public/images` | `public/images` |
| `routes/web.php` | добавить роуты в свой `routes/web.php` |
| `app/Http/Controllers/ProfileController.php` | контроллер-пример, поля подставить под свою модель `User` |
| `vite.config.js`, зависимости из `package.json` | заменить/слить |

```bash
npm i vue vue-router @fontsource/inter
npm i -D @vitejs/plugin-vue laravel-vite-plugin
npm run build
```

`vite.config.js` сам определяет Laravel по файлу `artisan` в корне: подключает `laravel-vite-plugin` и переключает API с mock на реальные запросы. Принудительно — переменная `VITE_AVANTI_MOCK=true|false`, базовый путь API — `VITE_AVANTI_API_BASE` (по умолчанию `/api`).

### API, которое ждёт фронт

Запросы идут с сессионной cookie и `X-CSRF-TOKEN` из `<meta name="csrf-token">`. Ошибки валидации — стандартный ответ Laravel 422 `{ message, errors }`, они показываются под полями.

| Метод | URL | Тело | Ответ |
| --- | --- | --- | --- |
| GET | `/api/profile` | — | `{ user, steps, consultant, notifications }` |
| PUT | `/api/profile/name` | `{ firstName, lastName }` | `{ user }` |
| PUT | `/api/profile/email` | `{ email }` | `{ user }` |
| PUT | `/api/profile/password` | `{ currentPassword, password, passwordConfirmation }` | 204 |
| POST | `/api/profile/email/verification` | — | 204 |
| POST | `/api/profile/email/verification/confirm` | `{ code }` | `{ user }` |

`user`: `firstName, lastName, email, emailVerified, emailChangeAllowed, avatar, approvedAmount, documentType, documentNumber, iban`.
`steps[]`: `key, short, title, icon (chart|shield|user|upload|pen), status (done|current|pending)`.

## Структура

```
resources/js
├── app.js, avanti_app.vue
├── router/avanti_router.js
├── services/avanti_api.js          # fetch + CSRF, mock для отдельной сборки
├── composables/                    # avanti_use_profile, avanti_use_form, avanti_use_toast
├── data/                           # иконки, навигация, mock
├── pages/                          # avanti_profile_page, avanti_placeholder_page
└── components
    ├── ui/        # button, icon, icon_button, input, code_input, modal, card, card_header, badge, avatar, logo, info_row, toast, page_state
    ├── layout/    # layout, header, nav_item, support_button, breadcrumbs, user_chip
    ├── profile/   # stepper, step_marker, personal_card, iban_field, security_card, security_row, email_verify, checklist_card, checklist_item, progress_segments, chat_popup
    └── modals/    # name_modal, email_modal, password_modal, modal_actions
```
