# GrowTale - The Live RPG

แอปพลิเคชัน RPG สำหรับครอบครัว ที่ให้พ่อแม่สร้าง Quest ให้ลูก และลูกสามารถสะสม EXP, Level Up, และแลกรางวัลได้

## 🚀 Tech Stack

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS + DaisyUI
- **Backend**: NestJS + Prisma + PostgreSQL
- **Real-time**: Socket.io
- **Database**: PostgreSQL (Docker)
- **Auth**: JWT + Refresh Token

## 📁 Project Structure

```
/growtale
├─ frontend/          # Next.js + TypeScript
├─ backend/           # NestJS + Prisma
├─ docker-compose.yml # PostgreSQL container
└─ README.md
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- Git

### 1. Clone Repository

```bash
git clone <repository-url>
cd growtale
```

### 2. Start Database

```bash
docker-compose up -d
```

### 3. Setup Backend

หมายเหตุ (Windows PowerShell): ให้รันคำสั่งทีละบรรทัด ไม่ใช้ตัวคั่น `&&`

```bash
cd backend
npm install
copy env.example .env
npx prisma migrate dev
npx prisma generate
npm run start:dev
```

### 4. Setup Frontend

ค่าเริ่มต้น Frontend ใช้พอร์ต 3002 (ปรับได้ด้วย flag `-p`)

```bash
cd frontend
npm install
copy env.example .env.local
npm run dev        # เริ่มที่ http://localhost:3002
# หรือระบุพอร์ตเอง เช่น 3007:
# npx next dev -p 3007
```

### 5. Access Application

- Frontend (dev): http://localhost:3002
- Backend API: http://localhost:3001
- Database (Docker): localhost:5433

### 6. First Time Setup

1. เปิด http://localhost:3002
2. สมัครสมาชิก Parent (พ่อแม่)
3. สร้างครอบครัวใหม่
4. แชร์ Invite Code ให้ลูก
5. สมัครสมาชิก Child (ลูก) และเข้าร่วมครอบครัว
6. เริ่มสร้าง Quest และ Rewards!

## 🎮 Features

### For Parents (Role Master)
- สร้างและจัดการ Quest สำหรับลูก
- ตั้งค่า Rewards และ Coin Shop
- ดูสถิติและความคืบหน้าของลูก
- จัดการ Family Group

### For Children (Hero)
- รับและทำ Quest ที่ได้รับมอบหมาย
- สะสม EXP และ Level Up
- แลก Coin เป็น Rewards
- ดู Profile และ Stats ของตัวเอง

## 🔧 Development

### Database Commands

```bash
# Reset database
npx prisma migrate reset

# View database
npx prisma studio

# Generate new migration
npx prisma migrate dev --name <migration-name>
```

### Environment Variables

สร้างไฟล์ `.env` ใน `backend/` และ `.env.local` ใน `frontend/`

**Backend (.env)**
```
DATABASE_URL="postgresql://growtale:growtale123@localhost:5433/growtale"
JWT_SECRET="your-super-secret-jwt-key"
JWT_REFRESH_SECRET="your-super-secret-refresh-key"
PORT=3001
FRONTEND_URL=http://localhost:3002
```

**Frontend (.env.local)**
```
NEXT_PUBLIC_API_URL="http://localhost:3001"
NEXT_PUBLIC_SOCKET_URL="http://localhost:3001"
```

## 📝 API Documentation

ดู API Documentation ที่ [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## 🔧 Development

### Database Commands

```bash
# Reset database (ลบข้อมูลทั้งหมด แล้ว migrate ใหม่)
npx prisma migrate reset

# เปิด UI ของฐานข้อมูล
npx prisma studio

# สร้าง migration ใหม่
npx prisma migrate dev --name <migration-name>
```

### Production build (Frontend)
```bash
cd frontend
npm run build
npm run start   # ใช้พอร์ตตามที่ตั้งใน package.json (ดีฟอลต์ 3002)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.
