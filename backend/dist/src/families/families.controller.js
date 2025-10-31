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
exports.FamiliesController = void 0;
const common_1 = require("@nestjs/common");
const families_service_1 = require("./families.service");
const create_family_dto_1 = require("./dto/create-family.dto");
const join_family_dto_1 = require("./dto/join-family.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let FamiliesController = class FamiliesController {
    familiesService;
    constructor(familiesService) {
        this.familiesService = familiesService;
    }
    getUserId(user) {
        return user.id;
    }
    async createFamily(user, createFamilyDto) {
        return this.familiesService.createFamily(this.getUserId(user), createFamilyDto);
    }
    async joinFamily(user, joinFamilyDto) {
        return this.familiesService.joinFamily(this.getUserId(user), joinFamilyDto);
    }
    async getMyFamily(user) {
        return this.familiesService.getUserFamily(this.getUserId(user));
    }
    async searchFamilies(q) {
        return this.familiesService.searchFamilies(q || '');
    }
    async getFamily(familyId, user) {
        return this.familiesService.getFamily(familyId, this.getUserId(user));
    }
    async getFamilyMembers(familyId, user) {
        return this.familiesService.getFamilyMembers(familyId, this.getUserId(user));
    }
    async joinById(user, familyId) {
        return this.familiesService.joinById(this.getUserId(user), familyId);
    }
};
exports.FamiliesController = FamiliesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Parent'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_family_dto_1.CreateFamilyDto]),
    __metadata("design:returntype", Promise)
], FamiliesController.prototype, "createFamily", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('join'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, join_family_dto_1.JoinFamilyDto]),
    __metadata("design:returntype", Promise)
], FamiliesController.prototype, "joinFamily", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('my-family'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FamiliesController.prototype, "getMyFamily", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Param)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FamiliesController.prototype, "searchFamilies", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], FamiliesController.prototype, "getFamily", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id/members'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], FamiliesController.prototype, "getFamilyMembers", null);
__decorate([
    (0, common_1.Post)('join-by-id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)('familyId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], FamiliesController.prototype, "joinById", null);
exports.FamiliesController = FamiliesController = __decorate([
    (0, common_1.Controller)('families'),
    __metadata("design:paramtypes", [families_service_1.FamiliesService])
], FamiliesController);
//# sourceMappingURL=families.controller.js.map