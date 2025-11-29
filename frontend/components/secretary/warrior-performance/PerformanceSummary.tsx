"use client";

import { Target, TrendingUp, Award } from "lucide-react";

interface PerformanceSummaryProps {
    target: any;
    achievement: any;
}

export default function PerformanceSummary({
    target,
    achievement,
}: PerformanceSummaryProps) {
    const calculatePercentage = (achieved: number, target: number) => {
        if (target === 0) return 0;
        return ((achieved / target) * 100).toFixed(1);
    };

    const metrics = [
        {
            label: "Weeks Completed",
            target: target.weeks,
            achieved: achievement.weeks,
            icon: <TrendingUp className="w-5 h-5" />,
        },
        {
            label: "Presentations",
            target: target.presentations,
            achieved: achievement.presentations,
            icon: <Award className="w-5 h-5" />,
        },
        {
            label: "Students Sensitized",
            target: target.studentsSensitization,
            achieved: achievement.studentsSensitization,
            icon: <Target className="w-5 h-5" />,
        },
        {
            label: "Impact Activities",
            target: target.impactTarget,
            achieved: achievement.impactTarget,
            icon: <TrendingUp className="w-5 h-5" />,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {metrics.map((metric, index) => (
                <div
                    key={index}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg border border-gray-700 p-5 hover:shadow-xl transition-shadow"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center text-orange-400">
                            {metric.icon}
                        </div>
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-bold ${
                                Number(calculatePercentage(metric.achieved, metric.target)) >= 75
                                    ? "bg-green-500/20 text-green-400"
                                    : Number(calculatePercentage(metric.achieved, metric.target)) >= 50
                                    ? "bg-blue-500/20 text-blue-400"
                                    : "bg-red-500/20 text-red-400"
                            }`}
                        >
                            {calculatePercentage(metric.achieved, metric.target)}%
                        </span>
                    </div>
                    <h3 className="text-gray-400 text-xs mb-2">{metric.label}</h3>
                    <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-bold text-white">{metric.achieved}</span>
                        <span className="text-gray-500 text-sm">/ {metric.target}</span>
                    </div>
                    <div className="mt-3 w-full bg-gray-700 rounded-full h-2">
                        <div
                            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
                            style={{
                                width: `${Math.min(
                                    Number(calculatePercentage(metric.achieved, metric.target)),
                                    100
                                )}%`,
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}