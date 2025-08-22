criar a database "concessionaria" no postgresql

Migrar BD
npx prisma migrate dev --name init

arquivo .env
DATABASE_URL="postgresql://postgres:123@localhost:5432/concessionaria?schema=public"
