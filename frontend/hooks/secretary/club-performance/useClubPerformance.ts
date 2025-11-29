"use client";

import { useState } from "react";

export interface PerformanceMetric {
    name: string;
    rate: number;
    target: number;
    achievement: number;
    balance: number;
    percentAch: number;
}

export interface RolePerformance {
    role: string;
    metrics: PerformanceMetric[];
    overallProgress: number;
}

export function useClubPerformance() {
    const [activeTab, setActiveTab] = useState<"overview" | "roles" | "comparison">("overview");

    const overallCommitment = {
        target: 28000,
        achieved: 18130,
        balance: 9870,
        percentAch: 64.75,
    };

    const globalMetrics = [
        { name: "Total Presentations", commitment: 140, achieved: 74, balance: 66, percentAch: 52.86 },
        { name: "Impact Activities (Max)", commitment: 50, achieved: 10, balance: 40, percentAch: 20.0 },
        { name: "Impact Outreach", commitment: 2000, achieved: 110, balance: 1890, percentAch: 5.5 },
        { name: "Mass Activities", commitment: 2, achieved: 0, balance: 2, percentAch: 0 },
        { name: "Mass Outreach", commitment: 1000, achieved: 0, balance: 1000, percentAch: 0 },
        { name: "Social Media Posts", commitment: 120, achieved: 30, balance: 90, percentAch: 25.0 },
        { name: "Frame Challenge", commitment: 50, achieved: 5, balance: 45, percentAch: 10.0 },
        { name: "Media Coverage (Students)", commitment: 10, achieved: 1, balance: 9, percentAch: 10.0 },
        { name: "Anti Fraud Downloads - Students", commitment: 2000, achieved: 200, balance: 1800, percentAch: 10.0 },
    ];

    const rolePerformances: RolePerformance[] = [
        {
            role: "President",
            metrics: [
                { name: "Club Meetings", rate: 11, target: 11, achievement: 6.43, balance: 4.57, percentAch: 58.44 },
                { name: "Presentation Compliance", rate: 0, target: 140, achievement: 0, balance: 140, percentAch: 0 },
                { name: "Impact Compliance", rate: 0, target: 0, achievement: 0, balance: 0, percentAch: 0 },
            ],
            overallProgress: 58.44,
        },
        {
            role: "Media Director",
            metrics: [
                { name: "No. of Weeks Assigned", rate: 11, target: 11, achievement: 6.43, balance: 4.57, percentAch: 58.44 },
                { name: "Total Teams", rate: 10, target: 10, achievement: 0, balance: 10, percentAch: 0 },
                { name: "Booklet Download", rate: 181.82, target: 2000, achievement: 200, balance: 1800, percentAch: 10.0 },
                { name: "Frame Challenge", rate: 0, target: 50, achievement: 5, balance: 45, percentAch: 10.0 },
                { name: "Social Media Post", rate: 10.91, target: 120, achievement: 30, balance: 90, percentAch: 25.0 },
                { name: "Media Coverage", rate: 0.91, target: 10, achievement: 1, balance: 9, percentAch: 10.0 },
            ],
            overallProgress: 18.91,
        },
        {
            role: "Activity Director",
            metrics: [
                { name: "No. of Weeks Assigned", rate: 11, target: 11, achievement: 6.43, balance: 4.57, percentAch: 58.44 },
                { name: "Total Teams", rate: 10, target: 10, achievement: 2, balance: 8, percentAch: 20.0 },
                { name: "Impact Activities / Week", rate: 4.55, target: 50, achievement: 10, balance: 40, percentAch: 20.0 },
                { name: "Impact Outreach / Week", rate: 181.82, target: 2000, achievement: 110, balance: 1890, percentAch: 5.5 },
                { name: "Live Visits", rate: 0, target: 10, achievement: 1, balance: 9, percentAch: 10.0 },
                { name: "Mass Activity", rate: 0, target: 2, achievement: 0, balance: 2, percentAch: 0 },
                { name: "Mass Outreach", rate: 0, target: 1000, achievement: 0, balance: 1000, percentAch: 0 },
            ],
            overallProgress: 22.79,
        },
        {
            role: "Secretary",
            metrics: [
                { name: "No. of Weeks Assigned", rate: 11, target: 11, achievement: 0, balance: 11, percentAch: 0 },
                { name: "Club Meetings (MOM)", rate: 1, target: 11, achievement: 1, balance: 10, percentAch: 9.09 },
                { name: "Presentations / Week", rate: 12.73, target: 140, achievement: 74, balance: 66, percentAch: 52.86 },
                { name: "5th - 7th", rate: 2.55, target: 28, achievement: 2, balance: 26, percentAch: 7.14 },
                { name: "8th - 10th", rate: 2.55, target: 28, achievement: 1, balance: 27, percentAch: 3.57 },
                { name: "College", rate: 2.55, target: 28, achievement: 3, balance: 25, percentAch: 10.71 },
                { name: "Students Sensitized / Week", rate: 2545.45, target: 28000, achievement: 2810, balance: 25190, percentAch: 10.04 },
            ],
            overallProgress: 13.34,
        },
    ];

    return {
        activeTab,
        setActiveTab,
        overallCommitment,
        globalMetrics,
        rolePerformances,
    };
}