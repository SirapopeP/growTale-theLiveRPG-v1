# GrowTale API Documentation

## Base URL
```
http://localhost:3001
```

## Authentication
API ใช้ JWT Authentication โดยต้องส่ง token ใน Authorization header:
```
Authorization: Bearer <access_token>
```

## Endpoints

### Authentication

#### POST /auth/register
สมัครสมาชิกใหม่

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "displayName": "ชื่อผู้ใช้",
  "role": "Parent" | "Child"
}
```

**Response:**
```json
{
  "accessToken": "jwt_token",
  "refreshToken": "refresh_token",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "displayName": "ชื่อผู้ใช้",
    "role": "Parent"
  }
}
```

#### POST /auth/login
เข้าสู่ระบบ

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "accessToken": "jwt_token",
  "refreshToken": "refresh_token",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "displayName": "ชื่อผู้ใช้",
    "role": "Parent"
  }
}
```

#### POST /auth/refresh
Refresh access token

**Request Body:**
```json
{
  "refreshToken": "refresh_token"
}
```

**Response:**
```json
{
  "accessToken": "new_jwt_token"
}
```

#### GET /auth/me
ดูข้อมูลผู้ใช้ปัจจุบัน

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "displayName": "ชื่อผู้ใช้",
  "role": "Parent",
  "profile": {
    "level": 1,
    "exp": 0,
    "coin": 0,
    "stats": {
      "strength": 0,
      "wisdom": 0,
      "discipline": 0,
      "creativity": 0,
      "kindness": 0
    }
  }
}
```

### Users

#### GET /users/me
ดูข้อมูล profile ของตัวเอง

#### PATCH /users/me
แก้ไขข้อมูล profile

**Request Body:**
```json
{
  "displayName": "ชื่อใหม่",
  "avatarUrl": "https://example.com/avatar.jpg"
}
```

#### GET /users/:id/profile
ดู profile ของสมาชิกครอบครัว

#### GET /users/level-info/:level
ดูข้อมูล level up

### Families

#### POST /families
สร้างครอบครัวใหม่ (Parent only)

**Request Body:**
```json
{
  "name": "ชื่อครอบครัว"
}
```

#### POST /families/join
เข้าร่วมครอบครัวด้วย invite code

**Request Body:**
```json
{
  "inviteCode": "ABC12345"
}
```

#### GET /families/my-family
ดูข้อมูลครอบครัวของตัวเอง

#### GET /families/:id
ดูข้อมูลครอบครัว

#### GET /families/:id/members
ดูสมาชิกครอบครัว

### Quests

#### POST /quests
สร้าง quest ใหม่ (Parent only)

**Request Body:**
```json
{
  "title": "ชื่อ quest",
  "description": "คำอธิบาย",
  "category": "บ้าน",
  "rewardExp": 10,
  "rewardCoin": 5,
  "dueDate": "2024-12-31",
  "assignedTo": 2
}
```

#### GET /quests
ดู quests ของครอบครัว

**Query Parameters:**
- `status`: filter ตาม status (pending, in_progress, submitted, completed, expired)
- `assignedTo`: filter ตามผู้รับมอบหมาย

#### GET /quests/:id
ดู quest รายละเอียด

#### PATCH /quests/:id/start
เริ่มทำ quest (Child only)

#### PATCH /quests/:id/submit
ส่ง quest (Child only)

**Request Body:**
```json
{
  "note": "หมายเหตุ",
  "evidenceUrl": "https://example.com/evidence.jpg"
}
```

#### PATCH /quests/:id/verify
อนุมัติ quest (Parent only)

**Request Body:**
```json
{
  "approved": true
}
```

#### DELETE /quests/:id
ลบ quest (Parent only)

### Rewards

#### POST /rewards
สร้าง reward ใหม่ (Parent only)

**Request Body:**
```json
{
  "title": "ชื่อ reward",
  "description": "คำอธิบาย",
  "costCoin": 10,
  "stock": 5,
  "expireAt": "2024-12-31"
}
```

#### GET /rewards
ดู rewards ของครอบครัว

#### GET /rewards/:id
ดู reward รายละเอียด

#### POST /rewards/:id/redeem
แลก reward (Child only)

#### PATCH /rewards/:redeemId/approve
อนุมัติการแลก reward (Parent only)

**Request Body:**
```json
{
  "approved": true
}
```

#### GET /rewards/redeem-requests
ดูคำขอแลก reward (Parent only)

#### PATCH /rewards/:id
แก้ไข reward (Parent only)

#### DELETE /rewards/:id
ลบ reward (Parent only)

### Activities

#### GET /activities
ดู timeline กิจกรรม

**Query Parameters:**
- `limit`: จำนวนรายการ (default: 50)
- `offset`: ข้ามรายการ (default: 0)

#### GET /activities/recent
ดูกิจกรรมล่าสุด

**Query Parameters:**
- `hours`: จำนวนชั่วโมงย้อนหลัง (default: 24)

#### GET /activities/stats
ดูสถิติกิจกรรม

#### GET /activities/type/:type
ดูกิจกรรมตามประเภท

## WebSocket Events

### Connection
```javascript
const socket = io('http://localhost:3001', {
  auth: {
    token: 'access_token'
  }
});
```

### Events

#### quest:created
Quest ใหม่ถูกสร้าง

#### quest:submitted
Quest ถูกส่ง

#### quest:verified
Quest ถูกอนุมัติ/ปฏิเสธ

#### reward:redeemed
คำขอแลก reward

#### reward:approved
Reward ถูกอนุมัติ

#### level:up
Level up

#### activity:new
กิจกรรมใหม่

#### notification
การแจ้งเตือนทั่วไป

## Error Responses

```json
{
  "statusCode": 400,
  "message": "Error message",
  "error": "Bad Request"
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error
