# Тестовое задание  NodeJs  - Сокращение ссылок.

## Стек:
DB: MongoDb
Framework: express
React

## Описание

Требуется реализовать web-приложение - аналог bit.ly и подобных систем.
То есть для длинных урлов создает их короткие аналоги <domain>/<subpart>.

Приложение содержит одну страницу на которой:
Форма в которой можно ввести URL, который должен быть сокращен
Табличку со всеми сокращенными URL (с пагинацией) данного пользователя

Обязательные требования:
[x]Приложение НЕ содержит авторизации.Приложение отслеживает пользователей по сессии, т.е. у каждого юзера свой набор редиректов (правил)
[x]Данные хранятся в MongoDB
[x]При заходе на сжатый URL приложение редиректит (серверный редирект) на соответствующий URL (который был сжат)
[x]Пользователь по желанию может указать свой <subpart>. Если такой <subpart> уже используется, нужно сообщить об этом юзеру
[x]Реализация на NodeJS (Express)
[x]Кэширование редиректов в Redis
[x]Очистка старых правил из MongoDB  по расписанию
