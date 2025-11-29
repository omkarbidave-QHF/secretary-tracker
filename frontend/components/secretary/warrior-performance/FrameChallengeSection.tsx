"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Image as ImageIcon, Calendar, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { FrameChallenge } from "@/hooks/secretary/warrior-performance/useCyberWarriorPerformance";
import toast from "react-hot-toast";

interface FrameChallengeSectionProps {
	challenges: FrameChallenge[];
	onAddChallenge: (challenge: { date: string; challengeName: string }) => void;
	onRemoveChallenge: (id: string) => void;
}

export default function FrameChallengeSection({
	challenges,
	onAddChallenge,
	onRemoveChallenge,
}: FrameChallengeSectionProps) {
	const [showForm, setShowForm] = useState(false);
	const [selectedDate, setSelectedDate] = useState("");
	const [selectedChallenge, setSelectedChallenge] = useState("");

	const challengeOptions = [
		"Digital Safety Poster",
		"Cyber Awareness Selfie",
		"Online Privacy Tips",
		"Anti-Bullying Campaign",
		"Password Security Art",
	];

	const handleSave = () => {
		if (!selectedDate || !selectedChallenge) {
			toast.error("Please fill both date and challenge name");
			return;
		}

		onAddChallenge({
			date: selectedDate,
			challengeName: selectedChallenge,
		});

		setSelectedDate("");
		setSelectedChallenge("");
		setShowForm(false);
	};

	return (
		<div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl border border-gray-700 p-6">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center space-x-3">
					<div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
						<ImageIcon className="w-6 h-6 text-white" />
					</div>
					<h3 className="text-2xl font-bold text-white">Frame Challenges</h3>
				</div>
				<Button
					onClick={() => setShowForm(!showForm)}
					className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg"
				>
					<Plus className="w-4 h-4 mr-2" />
					Add Challenge
				</Button>
			</div>

			{showForm && (
				<div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-5 mb-6">
					<div className="space-y-4">
						<div>
							<label className="text-gray-300 text-sm font-medium mb-2 block">
								Date
							</label>
							<Input
								type="date"
								value={selectedDate}
								onChange={(e) => setSelectedDate(e.target.value)}
								className="bg-gray-700 border-orange-500/30 text-white focus:border-orange-500 focus:ring-orange-500"
							/>
						</div>
						<div>
							<label className="text-gray-300 text-sm font-medium mb-2 block">
								Challenge Name
							</label>
							<select
								value={selectedChallenge}
								onChange={(e) => setSelectedChallenge(e.target.value)}
								className="w-full bg-gray-700 border border-orange-500/30 text-white h-11 rounded-lg px-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none cursor-pointer hover:bg-gray-600 transition-colors"
							>
								<option value="" disabled>
									Select challenge type...
								</option>
								{challengeOptions.map((option) => (
									<option key={option} value={option} className="bg-gray-800">
										{option}
									</option>
								))}
							</select>
						</div>
						<div className="flex gap-2">
							<Button
								className="flex-1 bg-green-600 hover:bg-green-700"
								onClick={handleSave}
							>
								Save Challenge
							</Button>
							<Button
								variant="outline"
								onClick={() => {
									setShowForm(false);
									setSelectedDate("");
									setSelectedChallenge("");
								}}
								className="border-orange-500/30 hover:bg-orange-500/10 text-gray-300"
							>
								Cancel
							</Button>
						</div>
					</div>
				</div>
			)}

			{challenges.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{challenges.map((challenge, index) => (
						<div
							key={challenge.id}
							className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-5 hover:bg-orange-500/20 transition-colors group"
						>
							<div className="flex items-start justify-between">
								<div className="flex-1">
									<div className="flex items-center space-x-2 mb-3">
										<Calendar className="w-4 h-4 text-orange-400" />
										<span className="text-gray-400 text-sm font-medium">
											{format(new Date(challenge.date), "dd MMM yyyy")}
										</span>
									</div>
									<h4 className="text-white font-semibold text-lg">
										{challenge.challengeName}
									</h4>
								</div>
								<button
									onClick={() => onRemoveChallenge(challenge.id)}
									className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300 hover:bg-red-500/10 p-2 rounded-lg"
								>
									<Trash2 className="w-4 h-4" />
								</button>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="text-center py-16">
					<div className="inline-flex items-center justify-center w-16 h-16 bg-gray-700/50 rounded-full mb-4">
						<ImageIcon className="w-8 h-8 text-gray-500" />
					</div>
					<p className="text-gray-400 font-medium">
						No frame challenges added yet
					</p>
					<p className="text-gray-500 text-sm mt-1">
						Click the button above to add your first challenge
					</p>
				</div>
			)}
		</div>
	);
}