"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";
import { useCyberWarriorPerformance } from "@/hooks/secretary/warrior-performance/useCyberWarriorPerformance";
import WarriorSelector from "@/components/secretary/warrior-performance/WarriorSelector";
import PerformanceSummary from "@/components/secretary/warrior-performance/PerformanceSummary";
import PresentationCard from "@/components/secretary/warrior-performance/PresentationCard";
import ImpactActivityCard from "@/components/secretary/warrior-performance/ImpactActivityCard";
import FrameChallengeSection from "@/components/secretary/warrior-performance/FrameChallengeSection";
import { useState } from "react";

export default function WarriorPerformancePage() {
	const router = useRouter();
	const [isSaving, setIsSaving] = useState(false);

	const {
		warriors,
		selectedWarrior,
		setSelectedWarrior,
		getSelectedWarriorData,
		updatePresentationLinks,
		updateImpactLinks,
		addFrameChallenge,
		removeFrameChallenge,
		saveChanges,
		getFormattedDataForBackend,
	} = useCyberWarriorPerformance();

	const warriorData = getSelectedWarriorData();

	const handleSaveChanges = async () => {
		setIsSaving(true);

		// Log formatted data for backend team
		console.log("Formatted data for DB:", getFormattedDataForBackend());

		const success = await saveChanges();
		setIsSaving(false);
	};

	return (
		<div className="min-h-screen bg-gray-900 p-4 md:p-6">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="flex items-center justify-between mb-8">
					<div>
						<h1 className="text-3xl font-bold text-white mb-2">
							Cyber Warrior Performance
						</h1>
						<p className="text-gray-400">
							Track individual warrior achievements
						</p>
					</div>
					<div className="flex gap-3">
						<Button
							onClick={() => router.back()}
							variant="outline"
							className="border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700"
						>
							← Back
						</Button>
						<Button
							onClick={handleSaveChanges}
							disabled={isSaving}
							className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
						>
							{isSaving ? (
								<>
									<Loader2 className="w-4 h-4 mr-2 animate-spin" />
									Saving...
								</>
							) : (
								<>
									<Save className="w-4 h-4 mr-2" />
									Save Changes
								</>
							)}
						</Button>
					</div>
				</div>

				{/* Warrior Selector */}
				<WarriorSelector
					warriors={warriors.map((w) => w.name)}
					selected={selectedWarrior}
					onSelect={setSelectedWarrior}
				/>

				{warriorData ? (
					<>
						{/* Performance Summary */}
						<PerformanceSummary
							target={warriorData.target}
							achievement={warriorData.achievement}
						/>

						{/* Presentations Section */}
						<div className="mb-8">
							<div className="flex items-center justify-between mb-5">
								<h2 className="text-2xl font-bold text-white">Presentations</h2>
								<span className="text-sm text-gray-400 bg-gray-800 px-4 py-2 rounded-full border border-gray-700">
									{warriorData.presentations.length} Total
								</span>
							</div>
							{warriorData.presentations.length > 0 ? (
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
									{warriorData.presentations.map((presentation, index) => (
										<PresentationCard
											key={presentation.id}
											presentation={presentation}
											index={index}
											onUpdateLinks={updatePresentationLinks}
										/>
									))}
								</div>
							) : (
								<div className="text-center py-16 bg-gray-800 rounded-2xl border border-gray-700">
									<div className="inline-flex items-center justify-center w-16 h-16 bg-gray-700 rounded-full mb-4">
										<span className="text-3xl">📊</span>
									</div>
									<p className="text-gray-400 font-medium">
										No presentations recorded yet
									</p>
									<p className="text-gray-500 text-sm mt-1">
										Presentations will appear here once added
									</p>
								</div>
							)}
						</div>

						{/* Impact Activities Section */}
						<div className="mb-8">
							<div className="flex items-center justify-between mb-5">
								<h2 className="text-2xl font-bold text-white">
									Impact Activities
								</h2>
								<span className="text-sm text-gray-400 bg-gray-800 px-4 py-2 rounded-full border border-gray-700">
									{warriorData.impactActivities.length} Total
								</span>
							</div>
							{warriorData.impactActivities.length > 0 ? (
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
									{warriorData.impactActivities.map((activity, index) => (
										<ImpactActivityCard
											key={activity.id}
											activity={activity}
											index={index}
											onUpdateLinks={updateImpactLinks}
										/>
									))}
								</div>
							) : (
								<div className="text-center py-16 bg-gray-800 rounded-2xl border border-gray-700">
									<div className="inline-flex items-center justify-center w-16 h-16 bg-gray-700 rounded-full mb-4">
										<span className="text-3xl">🎯</span>
									</div>
									<p className="text-gray-400 font-medium">
										No impact activities recorded yet
									</p>
									<p className="text-gray-500 text-sm mt-1">
										Activities will appear here once added
									</p>
								</div>
							)}
						</div>

						{/* Frame Challenges */}
						<FrameChallengeSection
							challenges={warriorData.frameChallenges}
							onAddChallenge={addFrameChallenge}
							onRemoveChallenge={removeFrameChallenge}
						/>
					</>
				) : (
					<div className="text-center py-24">
						<div className="inline-flex items-center justify-center w-24 h-24 bg-orange-500/20 rounded-full mb-6">
							<span className="text-5xl">👤</span>
						</div>
						<h3 className="text-2xl font-bold text-white mb-3">
							Select a Cyber Warrior
						</h3>
						<p className="text-gray-400 max-w-md mx-auto">
							Choose a warrior from the dropdown above to view their performance
							metrics and achievements
						</p>
					</div>
				)}
			</div>
		</div>
	);
}