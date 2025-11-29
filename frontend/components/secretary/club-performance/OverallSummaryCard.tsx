"use client";

import { TrendingUp, Target, Award, AlertCircle } from "lucide-react";

interface OverallSummaryCardProps {
    target: number;
    achieved: number;
    balance: number;
    percentAch: number;
}

export default function OverallSummaryCard({
    target,
    achieved,
    balance,
    percentAch,
}: OverallSummaryCardProps) {
    return (
        <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl shadow-2xl p-8 text-white mb-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-3xl font-bold mb-2">Overall Club Performance</h2>
                    <p className="text-orange-100 opacity-90">Commitment vs Achievement Tracking</p>
                </div>
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Award className="w-10 h-10" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                    icon={<Target className="w-6 h-6" />}
                    label="Target"
                    value={target.toLocaleString()}
                    color="bg-white/20"
                />
                <StatCard
                    icon={<TrendingUp className="w-6 h-6" />}
                    label="Achieved"
                    value={achieved.toLocaleString()}
                    color="bg-green-500/30"
                />
                <StatCard
                    icon={<AlertCircle className="w-6 h-6" />}
                    label="Balance"
                    value={balance.toLocaleString()}
                    color="bg-red-500/30"
                />
                <StatCard
                    icon={<Award className="w-6 h-6" />}
                    label="Completion"
                    value={`${percentAch.toFixed(2)}%`}
                    color="bg-yellow-500/30"
                />
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold">Overall Progress</span>
                    <span className="font-bold">{percentAch.toFixed(2)}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                        style={{ width: `${percentAch}%` }}
                    >
                        {percentAch > 10 && (
                            <span className="text-xs font-bold text-white">
                                {percentAch.toFixed(1)}%
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({
    icon,
    label,
    value,
    color,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    color: string;
}) {
    return (
        <div className={`${color} backdrop-blur-sm rounded-xl p-4`}>
            <div className="flex items-center space-x-3 mb-2">
                {icon}
                <span className="text-sm opacity-90">{label}</span>
            </div>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );
}