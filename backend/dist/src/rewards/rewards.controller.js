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
exports.RewardsController = void 0;
const common_1 = require("@nestjs/common");
const rewards_service_1 = require("./rewards.service");
const create_reward_dto_1 = require("./dto/create-reward.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let RewardsController = class RewardsController {
    rewardsService;
    constructor(rewardsService) {
        this.rewardsService = rewardsService;
    }
    async createReward(user, createRewardDto) {
        return this.rewardsService.createReward(user.id, createRewardDto);
    }
    async getRewards(user) {
        return this.rewardsService.getRewards(user.id);
    }
    async getRedeemRequests(user) {
        return this.rewardsService.getRedeemRequests(user.id);
    }
    async getReward(rewardId, user) {
        return this.rewardsService.getReward(rewardId, user.id);
    }
    async redeemReward(rewardId, user) {
        return this.rewardsService.redeemReward(rewardId, user.id);
    }
    async approveRedeem(redeemId, user, approved) {
        return this.rewardsService.approveRedeem(redeemId, user.id, approved);
    }
    async updateReward(rewardId, user, updateData) {
        return this.rewardsService.updateReward(rewardId, user.id, updateData);
    }
    async deleteReward(rewardId, user) {
        return this.rewardsService.deleteReward(rewardId, user.id);
    }
};
exports.RewardsController = RewardsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Parent'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_reward_dto_1.CreateRewardDto]),
    __metadata("design:returntype", Promise)
], RewardsController.prototype, "createReward", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RewardsController.prototype, "getRewards", null);
__decorate([
    (0, common_1.Get)('redeem-requests'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Parent'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RewardsController.prototype, "getRedeemRequests", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RewardsController.prototype, "getReward", null);
__decorate([
    (0, common_1.Post)(':id/redeem'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RewardsController.prototype, "redeemReward", null);
__decorate([
    (0, common_1.Patch)(':redeemId/approve'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Parent'),
    __param(0, (0, common_1.Param)('redeemId', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)('approved')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Boolean]),
    __metadata("design:returntype", Promise)
], RewardsController.prototype, "approveRedeem", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Parent'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], RewardsController.prototype, "updateReward", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Parent'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RewardsController.prototype, "deleteReward", null);
exports.RewardsController = RewardsController = __decorate([
    (0, common_1.Controller)('rewards'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [rewards_service_1.RewardsService])
], RewardsController);
//# sourceMappingURL=rewards.controller.js.map