"use client";

import { User, TrendingUp, Target } from "lucide-react";
import { RolePerformance } from "@/hooks/secretary/club-performance/useClubPerformance";

interface RolePerformanceCardProps {
	roleData: RolePerformance;
}

export default function RolePerformanceCard({
	roleData,
}: RolePerformanceCardProps) {
	const getRoleIcon = (role: string) => {
		const icons: Record<string, string> = {
			President: "👑",
			Secretary: "📝",
			"Media Director": "📱",
			"Activity Director": "🎯",
		};
		return icons[role] || "👤";
	};

	const getRoleColor = (role: string) => {
		const colors: Record<string, string> = {
			President: "from-purple-500 to-indigo-600",
			Secretary: "from-blue-500 to-cyan-600",
			"Media Director": "from-pink-500 to-rose-600",
			"Activity Director": "from-green-500 to-emerald-600",
		};
		return colors[role] || "from-gray-500 to-gray-600";
	};

	return (
		<div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl border border-gray-700 p-6">
			{/* Header */}
			<div
				className={`bg-gradient-to-r ${getRoleColor(
					roleData.role
				)} rounded-xl p-4 mb-6`}
			>
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<div className="text-4xl">{getRoleIcon(roleData.role)}</div>
						<div>
							<h3 className="text-xl font-bold text-white">{roleData.role}</h3>
							<p className="text-white/80 text-sm">Performance Metrics</p>
						</div>
					</div>
					<div className="text-right">
						<div className="text-3xl font-bold text-white">
							{roleData.overallProgress.toFixed(1)}%
						</div>
						<div className="text-white/80 text-xs">Overall</div>
					</div>
				</div>
			</div>

			{/* Metrics */}
			<div className="space-y-4">
				{roleData.metrics.map((metric, index) => (
					<div
						key={index}
						className="bg-gray-700/30 rounded-lg p-4 hover:bg-gray-700/50 transition-colors"
					>
						<div className="flex justify-between items-start mb-3">
							<h4 className="text-white font-medium text-sm">{metric.name}</h4>
							<span
								className={`px-2 py-1 rounded-full text-xs font-bold ${
									metric.percentAch >= 75
										? "bg-green-500/20 text-green-400"
										: metric.percentAch >= 50
										? "bg-blue-500/20 text-blue-400"
										: metric.percentAch >= 25
										? "bg-yellow-500/20 text-yellow-400"
										: "bg-red-500/20 text-red-400"
								}`}
							>
								{metric.percentAch.toFixed(1)}%
							</span>
						</div>

						<div className="grid grid-cols-3 gap-3 text-xs mb-2">
							<div>
								<span className="text-gray-400 block">Target</span>
								<span className="text-white font-semibold">
									{metric.target}
								</span>
							</div>
							<div>
								<span className="text-gray-400 block">Achieved</span>
								<span className="text-green-400 font-semibold">
									{metric.achievement}
								</span>
							</div>
							<div>
								<span className="text-gray-400 block">Balance</span>
								<span className="text-red-400 font-semibold">
									{metric.balance}
								</span>
							</div>
						</div>

						{/* Mini Progress Bar */}
						<div className="w-full bg-gray-600 rounded-full h-1.5">
							<div
								className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
								style={{ width: `${Math.min(metric.percentAch, 100)}%` }}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}