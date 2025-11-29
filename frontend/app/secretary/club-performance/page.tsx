"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, GitCompare } from "lucide-react";
import { useClubPerformance } from "@/hooks/secretary/club-performance/useClubPerformance";
import OverallSummaryCard from "@/components/secretary/club-performance/OverallSummaryCard";
import GlobalMetricsGrid from "@/components/secretary/club-performance/GlobalMetricsGrid";
import RolePerformanceCard from "@/components/secretary/club-performance/RolePerformanceCard";

export default function ClubPerformancePage() {
    const router = useRouter();
    const {
        activeTab,
        setActiveTab,
        overallCommitment,
        globalMetrics,
        rolePerformances,
    } = useClubPerformance();

    return (
        <div className="min-h-screen bg-gray-900 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Club Performance Dashboard
                        </h1>
                        <p className="text-gray-400">
                            Track commitments, achievements, and progress across all roles
                        </p>
                    </div>
                    <Button
                        onClick={() => router.back()}
                        variant="outline"
                        className="border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700"
                    >
                        ← Back
                    </Button>
                </div>

                {/* Overall Summary */}
                <OverallSummaryCard {...overallCommitment} />

                {/* Tabs */}
                <div className="flex space-x-2 mb-6">
                    <TabButton
                        active={activeTab === "overview"}
                        onClick={() => setActiveTab("overview")}
                        icon={<BarChart3 className="w-4 h-4" />}
                        label="Global Metrics"
                    />
                    <TabButton
                        active={activeTab === "roles"}
                        onClick={() => setActiveTab("roles")}
                        icon={<Users className="w-4 h-4" />}
                        label="Role Performance"
                    />
                </div>

                {/* Tab Content */}
                {activeTab === "overview" && (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Global Metrics Overview
                        </h2>
                        <GlobalMetricsGrid metrics={globalMetrics} />
                    </div>
                )}

                {activeTab === "roles" && (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Performance by Role
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {rolePerformances.map((role, index) => (
                                <RolePerformanceCard key={index} roleData={role} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function TabButton({
    active,
    onClick,
    icon,
    label,
}: {
    active: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
}) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                active
                    ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
            }`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
}