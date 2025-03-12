export type WeekDay = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export type Expertise = {
    id?: string;
    userId: string; 
    tags: string[];
    availableWeekDays: WeekDay[]; // Enum array for weekdays
    startTimeSlot: Date; 
    endTimeSlot: Date; 
    hourlyRate: number;
    rating?: number; 
    reviewCount?: number; 
};

export type UserInfo = {
    id?: string;
    name: string;
    username: string;
    email: string;
    walletAddress: string;
    createdAt: string;
    expertise: Expertise
};