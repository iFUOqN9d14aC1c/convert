#!/bin/bash

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Функция для вывода цветного текста
print_color() {
    printf "${1}${2}${NC}\n"
}

# Функция для проверки успешности выполнения команды
check_success() {
    if [ $? -eq 0 ]; then
        print_color $GREEN "✅ $1"
    else
        print_color $RED "❌ Ошибка: $1"
        exit 1
    fi
}

print_color $BLUE "🚀 Установка Telegram Proxy Converter"
print_color $BLUE "======================================"

# Проверяем наличие Docker
print_color $YELLOW "🔍 Проверяем наличие Docker..."
if ! command -v docker &> /dev/null; then
    print_color $RED "❌ Docker не установлен!"
    print_color $YELLOW "📥 Устанавливаем Docker..."
    
    # Обновляем пакеты
    sudo apt-get update
    check_success "Обновление пакетов"
    
    # Устанавливаем необходимые пакеты
    sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release
    check_success "Установка необходимых пакетов"
    
    # Добавляем GPG ключ Docker
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    check_success "Добавление GPG ключа Docker"
    
    # Добавляем репозиторий Docker
    echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    check_success "Добавление репозитория Docker"
    
    # Обновляем пакеты и устанавливаем Docker
    sudo apt-get update
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io
    check_success "Установка Docker"
    
    # Добавляем пользователя в группу docker
    sudo usermod -aG docker $USER
    check_success "Добавление пользователя в группу docker"
    
    print_color $GREEN "✅ Docker успешно установлен!"
else
    print_color $GREEN "✅ Docker уже установлен"
fi

# Проверяем наличие Docker Compose
print_color $YELLOW "🔍 Проверяем наличие Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    print_color $YELLOW "📥 Устанавливаем Docker Compose..."
    
    # Скачиваем Docker Compose
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    check_success "Скачивание Docker Compose"
    
    # Делаем файл исполняемым
    sudo chmod +x /usr/local/bin/docker-compose
    check_success "Настройка прав доступа для Docker Compose"
    
    print_color $GREEN "✅ Docker Compose успешно установлен!"
else
    print_color $GREEN "✅ Docker Compose уже установлен"
fi

# Запускаем Docker если он не запущен
print_color $YELLOW "🔄 Запускаем Docker..."
sudo systemctl start docker
sudo systemctl enable docker
check_success "Запуск Docker"

# Останавливаем существующие контейнеры (если есть)
print_color $YELLOW "🛑 Останавливаем существующие контейнеры..."
docker-compose down 2>/dev/null || true

# Собираем и запускаем приложение
print_color $YELLOW "🏗️  Собираем приложение..."
docker-compose build --no-cache
check_success "Сборка приложения"

print_color $YELLOW "🚀 Запускаем приложение..."
docker-compose up -d
check_success "Запуск приложения"

# Ждем запуска приложения
print_color $YELLOW "⏳ Ожидаем запуска приложения..."
sleep 10

# Проверяем статус приложения
print_color $YELLOW "🔍 Проверяем статус приложения..."
if curl -f http://localhost:5000/api/health > /dev/null 2>&1; then
    print_color $GREEN "✅ Приложение успешно запущено!"
else
    print_color $YELLOW "⚠️  Приложение запускается, подождите немного..."
fi

print_color $BLUE "======================================"
print_color $GREEN "🎉 Установка завершена успешно!"
print_color $BLUE "======================================"
print_color $YELLOW "📱 Приложение доступно по адресу: http://localhost:5000"
print_color $YELLOW "🐳 Для просмотра логов: docker-compose logs -f"
print_color $YELLOW "🛑 Для остановки: docker-compose down"
print_color $YELLOW "🔄 Для перезапуска: docker-compose restart"
print_color $BLUE "======================================"

# Показываем статус контейнеров
print_color $YELLOW "📊 Статус контейнеров:"
docker-compose ps