# คู่มือการทำ Prisma Migration

## วิธีที่ 1: Reset Database (Development เท่านั้น!)

**เมื่อไหร่ควรใช้:**
- ยังอยู่ในขั้น development/testing
- มีข้อมูล seed file สำหรับ recreate data
- Schema เปลี่ยนแปลงมากและต้องการเริ่มใหม่
- Database มี drift (ไม่ match กับ migration history)

**ขั้นตอน:**

1. **ตรวจสอบสถานะ migration ก่อน:**
```bash
npx prisma migrate status
```

2. **Reset database (ลบข้อมูลทั้งหมด + rerun migrations):**
```bash
npx prisma migrate reset
```
คำสั่งนี้จะ:
- ลบ database ทั้งหมด
- รัน migrations ทั้งหมดตั้งแต่ต้น
- รัน seed file อัตโนมัติ (ถ้ามี)

3. **สร้าง migration ใหม่สำหรับ schema changes:**
```bash
npx prisma migrate dev --name your_migration_name
```
- จะสร้าง migration file อัตโนมัติจาก schema changes
- จะ apply migration ทันที
- จะ generate Prisma Client อัตโนมัติ

**ตัวอย่างการใช้งาน:**
```bash
# 1. แก้ schema.prisma (เช่น เปลี่ยน category จาก String เป็น Int)
# 2. Reset database
npx prisma migrate reset

# 3. สร้าง migration สำหรับ category
npx prisma migrate dev --name change_quest_category_to_int
```

---

## วิธีที่ 2: สร้าง Migration แบบ Incremental (Production Safe)

**เมื่อไหร่ควรใช้:**
- Production environment
- มีข้อมูลสำคัญที่ต้องเก็บไว้
- Schema เปลี่ยนแปลงแบบ incremental (ทีละนิด)
- ต้องการควบคุม migration file เอง

**ขั้นตอน:**

1. **ตรวจสอบสถานะ migration:**
```bash
npx prisma migrate status
```

2. **แก้ schema.prisma** ตามต้องการ

3. **สร้าง migration file (ยังไม่ apply):**
```bash
npx prisma migrate dev --create-only --name your_migration_name
```
คำสั่งนี้จะ:
- สร้าง migration file จาก schema diff
- **ยังไม่ apply** ไปยัง database
- ให้คุณแก้ไข migration SQL ได้ก่อน

4. **ตรวจสอบและแก้ไข migration file (ถ้าจำเป็น):**
```bash
# เปิดไฟล์ที่สร้างใน prisma/migrations/[timestamp]_your_migration_name/migration.sql
# แก้ไข SQL ตามต้องการ (เช่น แปลงข้อมูลเก่าก่อนเปลี่ยน column type)
```

5. **Apply migration:**
```bash
npx prisma migrate dev
# หรือ
npx prisma migrate deploy  # สำหรับ production
```

**ตัวอย่าง: แปลง category จาก String เป็น Int**

1. แก้ schema.prisma:
```prisma
category Int?  // เปลี่ยนจาก String?
```

2. สร้าง migration file:
```bash
npx prisma migrate dev --create-only --name change_quest_category_to_int
```

3. แก้ไข migration.sql เพื่อแปลงข้อมูลเก่า:
```sql
-- เพิ่ม column ใหม่
ALTER TABLE "quests" ADD COLUMN "category_new" INTEGER;

-- แปลงข้อมูลเก่า
UPDATE "quests" 
SET "category_new" = CASE 
  WHEN "category" = 'บ้าน' THEN 1
  WHEN "category" = 'เรียน' THEN 2
  WHEN "category" = 'สุขภาพ' THEN 3
  WHEN "category" = 'พฤติกรรม' THEN 4
  ELSE NULL
END;

-- Drop column เก่า
ALTER TABLE "quests" DROP COLUMN "category";

-- Rename column ใหม่
ALTER TABLE "quests" RENAME COLUMN "category_new" TO "category";
```

4. Apply migration:
```bash
npx prisma migrate dev
```

---

## การจัดการ Drift (Database ไม่ตรงกับ Migration History)

**Drift คืออะไร:**
- Database schema ไม่ตรงกับ migration files
- เกิดจากแก้ database โดยตรง หรือ migration files หาย

**วิธีแก้ Drift:**

### Option A: Reset (Development เท่านั้น)
```bash
npx prisma migrate reset
```

### Option B: Baseline (Production)
```bash
# 1. ตรวจสอบ drift
npx prisma migrate status

# 2. สร้าง migration baseline (mark database เป็น up-to-date)
npx prisma migrate resolve --applied [migration_name]

# หรือแก้ database ให้ตรงกับ migration history
```

---

## คำสั่งสำคัญ

| คำสั่ง | คำอธิบาย |
|--------|----------|
| `prisma migrate dev` | สร้าง migration + apply + generate client (interactive) |
| `prisma migrate dev --name xxx` | สร้าง migration พร้อมตั้งชื่อ |
| `prisma migrate dev --create-only` | สร้าง migration file แต่ยังไม่ apply |
| `prisma migrate deploy` | Apply migrations ใน production |
| `prisma migrate status` | ตรวจสอบสถานะ migrations |
| `prisma migrate reset` | Reset database + rerun migrations (dev only!) |
| `prisma generate` | Generate Prisma Client หลังจากแก้ schema |

---

## Best Practices

1. **Commit migration files** พร้อมกับ code changes
2. **ตรวจสอบ migration SQL** ก่อน apply ใน production
3. **Backup database** ก่อน migrate ใน production
4. **Test migrations** ใน staging ก่อน production
5. **ใช้ `--create-only`** เมื่อต้องการ customize migration SQL
6. **อย่า reset** database ใน production!

---

## ตัวอย่าง Workflow

### Development Environment:
```bash
# 1. แก้ schema.prisma
# 2. Reset (ถ้าต้องการ)
npx prisma migrate reset

# 3. หรือสร้าง migration ใหม่
npx prisma migrate dev --name add_new_feature
```

### Production Environment:
```bash
# 1. แก้ schema.prisma
# 2. สร้าง migration (locally)
npx prisma migrate dev --create-only --name add_new_feature

# 3. ตรวจสอบ migration file

# 4. Apply ใน production
npx prisma migrate deploy
```

