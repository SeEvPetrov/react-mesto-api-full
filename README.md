[![Tests](https://github.com/SeEvPetrov/react-mesto-api-full-gha/actions/workflows/tests.yml/badge.svg)](https://github.com/yandex-praktikum/react-mesto-api-full-gha/actions/workflows/tests.yml)
# react-mesto-api-full
Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями. Бэкенд расположите в директории `backend/`, а фронтенд - в `frontend/`. 
  
Пожалуйста, прикрепите в это описание ссылку на сайт, размещенный на Яндекс.Облаке.

Адрес репозитория: https://github.com/SeEvPetrov/react-mesto-api-full.git

## Ссылки на проект

IP-адрес 178.154.205.161

Frontend https://mesto.petrov.nomorepartiesxyz.ru

Backend https://api.mesto.petrov.nomorepartiesxyz.ru

## Примененные знания
* Верстка
  - Соверменная верстка с использованием Flexbox и Grid Layout
  - Семантическая верстка
  - Адаптивная верстка сайта для разных экранов (от 320 до 1280+)
  - Верстка форм (текстовые поля и кнопки)
  - Методология БЭМ
* React
  - использование Create React App
  - хуки `useState` и `useEffect`
  - поднятие стейта
  - глобальный стейт через React Context
  - управляемые компоненты в элементах формы
  - использование реф для прямого доступа к DOM-элементам

* React Router
  - реализован функционал  регистрации и авторизации
  - защищенные маршруты
  - авторизация через JWT
  - работа с Local Starage

* Бэкенд
  - Node.js
  - express.js
  - MongoDB
  - Mongoose

### Инструкция по разрёртыванию проекта:
```bash
# клонирование репозитория
$ git clone https://github.com/goldlexx/react-mesto-api-full.git

# установка зависимостей
$ npm install

# запуск develop-сборки фронтенда
$ npm run start

# Запуск develop-сборки бэкенда
$ npm run dev
```