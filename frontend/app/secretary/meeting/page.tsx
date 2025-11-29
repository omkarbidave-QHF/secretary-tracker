"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, Save } from "lucide-react";
import { useMeetingLog } from "@/hooks/secretary/meeting/useMeetingLog";
import MeetingCard from "@/components/secretary/meeting/MeetingCard";
import AddMeetingModal from "@/components/secretary/meeting/AddMeetingModal";

export default function MeetingLogPage() {
	const router = useRouter();
	const {
		clubName,
		setClubName,
		members,
		setMembers,
		availableWeeks,
		setAvailableWeeks,
		meetings,
		addMeeting,
		deleteMeeting,
		showAddModal,
		setShowAddModal,
		handleSave,
		isPending,
	} = useMeetingLog();

	return (
		<div className="min-h-screen bg-gray-900 p-4 md:p-6">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="flex items-center justify-between mb-6">
					<div>
						<h1 className="text-3xl font-bold text-white mb-2">Meeting Log</h1>
						<p className="text-gray-400">Track club meetings and activities</p>
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
							onClick={handleSave}
							disabled={isPending}
							className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
						>
							<Save className="w-4 h-4 mr-2" />
							Save Log
						</Button>
					</div>
				</div>

				{/* Meetings Section */}
				<div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl border border-gray-700 p-6">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-2xl font-bold text-white">Meetings</h2>
						<Button
							onClick={() => setShowAddModal(true)}
							className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
						>
							<Plus className="w-4 h-4 mr-2" />
							Add Meeting
						</Button>
					</div>

					{meetings.length === 0 ? (
						<div className="text-center py-16">

							<div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-500/20 to-red-500/20 border-2 border-orange-500/50 rounded-full mb-6 animate-pulse">
								<svg
									className="w-12 h-12 text-orange-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
							</div>

							<h3 className="text-2xl font-bold text-white mb-2">
								No Meetings Yet
							</h3>
							<p className="text-gray-400 text-base mb-8 max-w-md mx-auto">
								Start documenting your club meetings to track progress and
								maintain records
							</p>

							<Button
								onClick={() => setShowAddModal(true)}
								className="group relative bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-semibold px-8 py-6 text-base rounded-xl shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105"
							>
								<span className="relative z-10 flex items-center">
									<Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
									Add Your First Meeting
								</span>

								<div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
							</Button>

							<p className="text-gray-500 text-sm mt-6 flex items-center justify-center">
								<svg
									className="w-4 h-4 mr-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								Click the button above to record your first club meeting
							</p>
						</div>
					) : (
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							{meetings.map((meeting) => (
								<MeetingCard
									key={meeting.id}
									meeting={meeting}
									onDelete={deleteMeeting}
								/>
							))}
						</div>
					)}
				</div>
			</div>

			<AddMeetingModal
				open={showAddModal}
				onClose={() => setShowAddModal(false)}
				onAdd={addMeeting}
			/>
		</div>
	);
}