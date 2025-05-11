FROM node:18

# Tworzymy nie-rootowego użytkownika
RUN useradd --user-group --create-home --shell /bin/false appuser
# Ustawiamy katalog roboczy
WORKDIR /app

# Kopiujemy package.json i instalujemy zależności jako root
COPY package*.json ./
RUN npm install

# Kopiujemy resztę projektu
COPY . .

# Generujemy klienta Prisma
RUN npx prisma generate

# Zmieniamy właściciela katalogu na nowego użytkownika
RUN chown -R appuser:appuser /app

# Przełączamy się na użytkownika
USER appuser

# Otwieramy port (zmień na swój, np. 3001)
EXPOSE 3001

# Komenda startowa
CMD ["npm", "run", "start"]
