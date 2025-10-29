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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateQuestDto = exports.QuestCategory = void 0;
const class_validator_1 = require("class-validator");
var QuestCategory;
(function (QuestCategory) {
    QuestCategory["HOME"] = "\u0E1A\u0E49\u0E32\u0E19";
    QuestCategory["STUDY"] = "\u0E40\u0E23\u0E35\u0E22\u0E19";
    QuestCategory["HEALTH"] = "\u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E";
    QuestCategory["BEHAVIOR"] = "\u0E1E\u0E24\u0E15\u0E34\u0E01\u0E23\u0E23\u0E21";
})(QuestCategory || (exports.QuestCategory = QuestCategory = {}));
class CreateQuestDto {
    title;
    description;
    category;
    rewardExp;
    rewardCoin;
    dueDate;
    assignedTo;
}
exports.CreateQuestDto = CreateQuestDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateQuestDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(QuestCategory),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateQuestDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateQuestDto.prototype, "rewardExp", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateQuestDto.prototype, "rewardCoin", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateQuestDto.prototype, "dueDate", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateQuestDto.prototype, "assignedTo", void 0);
//# sourceMappingURL=create-quest.dto.js.map