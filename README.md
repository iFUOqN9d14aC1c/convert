# Telegram Proxy Converter

Современное веб-приложение для конвертации прокси-серверов в стиле Telegram с поддержкой расшифровки Telegram SOCKS ссылок.

## 🚀 Возможности

- **Конвертация прокси**: Преобразование данных прокси (IP, порт, логин, пароль) в стандартный формат URL
- **Расшифровка Telegram ссылок**: Декодирование ссылок вида `https://t.me/socks?server=1.1.1.1&port=444&user=login&pass=password`
- **Поддержка протоколов**: HTTP, HTTPS, SOCKS4, SOCKS5
- **Современный интерфейс**: Дизайн в стиле Telegram
- **Копирование в буфер**: Быстрое копирование результатов
- **Адаптивный дизайн**: Работает на всех устройствах

## 🐳 Быстрая установка через Docker

### Автоматическая установка (рекомендуется)

```bash
# Скачиваем и запускаем скрипт установки
curl -fsSL https://raw.githubusercontent.com/iFUOqN9d14aC1c/convert/main/setup.sh | bash
```

### Ручная установка

1. **Клонируйте репозиторий:**
```bash
git clone https://github.com/iFUOqN9d14aC1c/convert.git
cd telegram-proxy-converter
```

2. **Запустите скрипт установки:**
```bash
chmod +x setup.sh
./setup.sh
```

3. **Или используйте Docker Compose напрямую:**
```bash
docker-compose up -d --build
```

## 📋 Требования

- Docker 20.10+
- Docker Compose 2.0+
- Свободный порт 5000

## 🛠️ Ручная установка без Docker

1. **Установите Node.js 18+**

2. **Клонируйте репозиторий:**
```bash
git clone https://github.com/iFUOqN9d14aC1c/convert.git
cd telegram-proxy-converter
```

3. **Установите зависимости:**
```bash
npm install
```

4. **Соберите приложение:**
```bash
npm run build
```

5. **Запустите сервер:**
```bash
npm start
```

Приложение будет доступно по адресу: http://localhost:5000

## 📖 Использование

### Конвертация прокси

1. Выберите протокол (HTTP, HTTPS, SOCKS4, SOCKS5)
2. Введите IP адрес и порт
3. При необходимости добавьте логин и пароль
4. Нажмите "Конвертировать"
5. Скопируйте результат

**Пример результата:**
```
socks5://username:password@192.168.1.1:1080
```

### Расшифровка Telegram ссылок

1. Переключитесь на вкладку "Расшифровка Telegram"
2. Вставьте ссылку вида: `https://t.me/socks?server=1.1.1.1&port=444&user=login&pass=password`
3. Нажмите "Расшифровать"
4. Просмотрите расшифрованные данные и скопируйте результат

## 🔧 Управление Docker контейнером

```bash
# Просмотр логов
docker-compose logs -f

# Остановка приложения
docker-compose down

# Перезапуск
docker-compose restart

# Пересборка и запуск
docker-compose up -d --build

# Просмотр статуса
docker-compose ps
```

## 🌐 API

Приложение предоставляет простой API для проверки состояния:

```bash
# Проверка здоровья приложения
curl http://localhost:5000/api/health
```

## 🎨 Поддерживаемые форматы

- `http://ip:port`
- `https://ip:port`
- `socks4://ip:port`
- `socks5://ip:port`
- `protocol://username:password@ip:port`

## 🔒 Безопасность

- Все данные обрабатываются локально
- Нет отправки данных на внешние серверы
- Поддержка HTTPS в production

## 🐛 Устранение неполадок

### Приложение не запускается

1. Проверьте, что порт 5000 свободен:
```bash
sudo netstat -tlnp | grep :5000
```

2. Проверьте логи Docker:
```bash
docker-compose logs
```

3. Перезапустите контейнер:
```bash
docker-compose down && docker-compose up -d
```

### Docker не установлен

Скрипт `setup.sh` автоматически установит Docker, но вы можете установить его вручную:

**Ubuntu/Debian:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

**CentOS/RHEL:**
```bash
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker
```

## 📝 Лицензия

MIT License - см. файл [LICENSE](LICENSE)

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции
3. Внесите изменения
4. Создайте Pull Request

## 📞 Поддержка

Если у вас возникли проблемы:

1. Проверьте [Issues](https://github.com/iFUOqN9d14aC1c/convert/issues)
2. Создайте новый Issue с описанием проблемы
3. Приложите логи: `docker-compose logs`

---

**⚠️ Важно**: Приложение должно запуститься с первого раза без проблем, иначе вас похитит злой Крампус! 🎄👹