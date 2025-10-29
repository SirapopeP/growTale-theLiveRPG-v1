"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestsController = void 0;
const common_1 = require("@nestjs/common");
const quests_service_1 = require("./quests.service");
const create_quest_dto_1 = require("./dto/create-quest.dto");
const submit_quest_dto_1 = require("./dto/submit-quest.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let QuestsController = class QuestsController {
    questsService;
    constructor(questsService) {
        this.questsService = questsService;
    }
    async createQuest(user, createQuestDto) {
        return this.questsService.createQuest(user.id, createQuestDto);
    }
    async getQuests(user, status, assignedTo) {
        return this.questsService.getQuests(user.id, status, assignedTo);
    }
    async getQuest(questId, user) {
        return this.questsService.getQuest(questId, user.id);
    }
    async startQuest(questId, user) {
        return this.questsService.startQuest(questId, user.id);
    }
    async submitQuest(questId, user, submitQuestDto) {
        return this.questsService.submitQuest(questId, user.id, submitQuestDto);
    }
    async verifyQuest(questId, user, approved) {
        return this.questsService.verifyQuest(questId, user.id, approved);
    }
    async deleteQuest(questId, user) {
        return this.questsService.deleteQuest(questId, user.id);
    }
};
exports.QuestsController = QuestsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Parent'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_quest_dto_1.CreateQuestDto]),
    __metadata("design:returntype", Promise)
], QuestsController.prototype, "createQuest", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('assignedTo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number]),
    __metadata("design:returntype", Promise)
], QuestsController.prototype, "getQuests", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], QuestsController.prototype, "getQuest", null);
__decorate([
    (0, common_1.Patch)(':id/start'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], QuestsController.prototype, "startQuest", null);
__decorate([
    (0, common_1.Patch)(':id/submit'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, submit_quest_dto_1.SubmitQuestDto]),
    __metadata("design:returntype", Promise)
], QuestsController.prototype, "submitQuest", null);
__decorate([
    (0, common_1.Patch)(':id/verify'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Parent'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)('approved')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Boolean]),
    __metadata("design:returntype", Promise)
], QuestsController.prototype, "verifyQuest", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Parent'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], QuestsController.prototype, "deleteQuest", null);
exports.QuestsController = QuestsController = __decorate([
    (0, common_1.Controller)('quests'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [quests_service_1.QuestsService])
], QuestsController);
//# sourceMappingURL=quests.controller.js.map