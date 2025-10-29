export declare enum QuestCategory {
    HOME = "\u0E1A\u0E49\u0E32\u0E19",
    STUDY = "\u0E40\u0E23\u0E35\u0E22\u0E19",
    HEALTH = "\u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E",
    BEHAVIOR = "\u0E1E\u0E24\u0E15\u0E34\u0E01\u0E23\u0E23\u0E21"
}
export declare class CreateQuestDto {
    title: string;
    description?: string;
    category?: QuestCategory;
    rewardExp?: number;
    rewardCoin?: number;
    dueDate?: string;
    assignedTo?: number;
}
