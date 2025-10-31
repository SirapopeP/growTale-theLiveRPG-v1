"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const enums_1 = require("../src/common/enums");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 เริ่มต้น seeding ข้อมูล...');
    await prisma.activity.deleteMany();
    await prisma.rewardRedeem.deleteMany();
    await prisma.reward.deleteMany();
    await prisma.questLog.deleteMany();
    await prisma.quest.deleteMany();
    await prisma.familyMember.deleteMany();
    await prisma.family.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.userRole.deleteMany();
    await prisma.user.deleteMany();
    console.log('✅ ลบข้อมูลเดิมเรียบร้อย');
    const passwordHash = await bcrypt.hash('password123', 10);
    const admin = await prisma.user.create({
        data: {
            email: 'admin@growtale.com',
            passwordHash,
            displayName: 'Admin',
            status: 'active',
            userRole: {
                create: {
                    role: 'Admin',
                },
            },
            profile: {
                create: {
                    level: 99,
                    exp: 999999,
                    coin: 999999,
                    stats: {
                        strength: 100,
                        wisdom: 100,
                        discipline: 100,
                        creativity: 100,
                        kindness: 100,
                    },
                    badges: ['admin_badge', 'founder_badge'],
                },
            },
        },
    });
    console.log('✅ สร้าง Admin:', admin.email);
    const parent1 = await prisma.user.create({
        data: {
            email: 'parent1@example.com',
            passwordHash,
            displayName: 'พ่อมานะ',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=parent1',
            status: 'active',
            userRole: {
                create: {
                    role: 'Parent',
                },
            },
            profile: {
                create: {
                    level: 5,
                    exp: 450,
                    coin: 1000,
                    stats: {
                        strength: 10,
                        wisdom: 15,
                        discipline: 12,
                        creativity: 8,
                        kindness: 20,
                    },
                    badges: ['early_adopter'],
                },
            },
        },
    });
    console.log('✅ สร้าง Parent 1:', parent1.email);
    const parent2 = await prisma.user.create({
        data: {
            email: 'parent2@example.com',
            passwordHash,
            displayName: 'แม่สุดา',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=parent2',
            status: 'active',
            userRole: {
                create: {
                    role: 'Parent',
                },
            },
            profile: {
                create: {
                    level: 4,
                    exp: 320,
                    coin: 850,
                    stats: {
                        strength: 8,
                        wisdom: 18,
                        discipline: 15,
                        creativity: 12,
                        kindness: 22,
                    },
                    badges: ['early_adopter'],
                },
            },
        },
    });
    console.log('✅ สร้าง Parent 2:', parent2.email);
    const child = await prisma.user.create({
        data: {
            email: 'child1@example.com',
            passwordHash,
            displayName: 'น้องมิ้นต์',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=child1',
            status: 'active',
            userRole: {
                create: {
                    role: 'Child',
                },
            },
            profile: {
                create: {
                    level: 3,
                    exp: 180,
                    coin: 250,
                    stats: {
                        strength: 5,
                        wisdom: 8,
                        discipline: 6,
                        creativity: 15,
                        kindness: 12,
                    },
                    badges: ['beginner'],
                },
            },
        },
    });
    console.log('✅ สร้าง Child:', child.email);
    const family = await prisma.family.create({
        data: {
            name: 'ครอบครัวมานะ',
            inviteCode: 'MANAFAM2024',
            status: 'active',
        },
    });
    console.log('✅ สร้าง Family:', family.name);
    await prisma.familyMember.createMany({
        data: [
            {
                familyId: family.id,
                userId: parent1.id,
                role: 'Parent',
            },
            {
                familyId: family.id,
                userId: parent2.id,
                role: 'Parent',
            },
            {
                familyId: family.id,
                userId: child.id,
                role: 'Child',
            },
        ],
    });
    console.log('✅ เพิ่มสมาชิกเข้า Family เรียบร้อย');
    const quest1 = await prisma.quest.create({
        data: {
            familyId: family.id,
            createdBy: parent1.id,
            assignedTo: child.id,
            title: 'ทำการบ้านคณิตศาสตร์',
            description: 'ทำแบบฝึกหัดคณิตศาสตร์หน้า 25-30',
            category: enums_1.QuestCategory.STUDY,
            rewardExp: 50,
            rewardCoin: 20,
            status: 'pending',
        },
    });
    const quest2 = await prisma.quest.create({
        data: {
            familyId: family.id,
            createdBy: parent2.id,
            assignedTo: child.id,
            title: 'เก็บของเล่นให้เรียบร้อย',
            description: 'จัดเก็บของเล่นในห้องนอนให้เรียบร้อย',
            category: enums_1.QuestCategory.HOME,
            rewardExp: 30,
            rewardCoin: 15,
            status: 'pending',
        },
    });
    console.log('✅ สร้าง Quest ตัวอย่าง:', quest1.title, ',', quest2.title);
    const reward1 = await prisma.reward.create({
        data: {
            familyId: family.id,
            createdBy: parent1.id,
            title: 'ดูการ์ตูนเพิ่ม 30 นาที',
            description: 'สามารถดูการ์ตูนเพิ่มได้ 30 นาที',
            costCoin: 50,
            stock: 10,
            status: 'active',
        },
    });
    const reward2 = await prisma.reward.create({
        data: {
            familyId: family.id,
            createdBy: parent2.id,
            title: 'ไปเที่ยวสวนสนุก',
            description: 'ไปเที่ยวสวนสนุกกับครอบครัว',
            costCoin: 500,
            stock: 1,
            status: 'active',
        },
    });
    console.log('✅ สร้าง Reward ตัวอย่าง:', reward1.title, ',', reward2.title);
    await prisma.activity.createMany({
        data: [
            {
                familyId: family.id,
                userId: parent1.id,
                type: 'family_created',
                message: 'สร้างครอบครัว "ครอบครัวมานะ"',
            },
            {
                familyId: family.id,
                userId: parent1.id,
                type: 'quest_created',
                message: 'สร้างภารกิจ "ทำการบ้านคณิตศาสตร์"',
                refId: quest1.id,
            },
            {
                familyId: family.id,
                userId: parent2.id,
                type: 'quest_created',
                message: 'สร้างภารกิจ "เก็บของเล่นให้เรียบร้อย"',
                refId: quest2.id,
            },
        ],
    });
    console.log('✅ สร้าง Activity Log เรียบร้อย');
    console.log('\n🎉 Seeding เสร็จสมบูรณ์!\n');
    console.log('📝 ข้อมูลการเข้าสู่ระบบ:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👑 Admin:');
    console.log('   Email: admin@growtale.com');
    console.log('   Password: password123');
    console.log('');
    console.log('👨 Parent 1:');
    console.log('   Email: parent1@example.com');
    console.log('   Password: password123');
    console.log('');
    console.log('👩 Parent 2:');
    console.log('   Email: parent2@example.com');
    console.log('   Password: password123');
    console.log('');
    console.log('👧 Child:');
    console.log('   Email: child1@example.com');
    console.log('   Password: password123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}
main()
    .catch((e) => {
    console.error('❌ เกิดข้อผิดพลาดในการ seeding:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map