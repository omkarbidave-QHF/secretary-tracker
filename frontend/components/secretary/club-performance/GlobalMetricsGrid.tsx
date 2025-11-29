"use client";

interface Metric {
	name: string;
	commitment: number;
	achieved: number;
	balance: number;
	percentAch: number;
}

interface GlobalMetricsGridProps {
	metrics: Metric[];
}

export default function GlobalMetricsGrid({ metrics }: GlobalMetricsGridProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{metrics.map((metric, index) => (
				<MetricCard key={index} metric={metric} />
			))}
		</div>
	);
}

function MetricCard({ metric }: { metric: Metric }) {
	const getProgressColor = (percent: number) => {
		if (percent >= 75) return "from-green-500 to-emerald-600";
		if (percent >= 50) return "from-blue-500 to-cyan-600";
		if (percent >= 25) return "from-yellow-500 to-orange-600";
		return "from-red-500 to-pink-600";
	};

	const getBackgroundColor = (percent: number) => {
		if (percent >= 75) return "from-green-500/10 to-emerald-500/10";
		if (percent >= 50) return "from-blue-500/10 to-cyan-500/10";
		if (percent >= 25) return "from-yellow-500/10 to-orange-500/10";
		return "from-red-500/10 to-pink-500/10";
	};

	return (
		<div
			className={`bg-gradient-to-br ${getBackgroundColor(
				metric.percentAch
			)} border border-gray-700 rounded-xl p-5 hover:shadow-lg transition-shadow`}
		>
			<h3 className="text-white font-semibold mb-4 text-sm">{metric.name}</h3>

			<div className="space-y-3">
				<div className="flex justify-between text-sm">
					<span className="text-gray-400">Target:</span>
					<span className="text-white font-semibold">{metric.commitment}</span>
				</div>
				<div className="flex justify-between text-sm">
					<span className="text-gray-400">Achieved:</span>
					<span className="text-green-400 font-semibold">
						{metric.achieved}
					</span>
				</div>
				<div className="flex justify-between text-sm">
					<span className="text-gray-400">Balance:</span>
					<span className="text-red-400 font-semibold">{metric.balance}</span>
				</div>

				{/* Progress Bar */}
				<div className="pt-2">
					<div className="flex justify-between text-xs mb-1">
						<span className="text-gray-400">Progress</span>
						<span className="text-white font-bold">
							{metric.percentAch.toFixed(1)}%
						</span>
					</div>
					<div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
						<div
							className={`h-full bg-gradient-to-r ${getProgressColor(
								metric.percentAch
							)} transition-all duration-500`}
							style={{ width: `${Math.min(metric.percentAch, 100)}%` }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}