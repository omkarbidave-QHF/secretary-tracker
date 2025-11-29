"use client";

import { Meeting } from "@/hooks/secretary/meeting/useMeetingLog";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Image, MapPin, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface MeetingCardProps {
	meeting: Meeting;
	onDelete: (id: string) => void;
}

export default function MeetingCard({ meeting, onDelete }: MeetingCardProps) {
	return (
		<div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg border border-gray-700 p-6 hover:shadow-xl transition-shadow">
			{/* Header */}
			<div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-700">
				<div>
					<div className="flex items-center space-x-3 mb-1">
						<h3 className="text-xl font-bold text-white">
							{meeting.meetingNo}
						</h3>
						<span className="px-3 py-1 bg-orange-500/20 border border-orange-500/50 rounded-full text-xs text-orange-400 font-semibold">
							Meeting #{meeting.srNo}
						</span>
					</div>
					<div className="flex items-center text-gray-400 text-sm">
						<Calendar className="w-4 h-4 mr-2" />
						{format(new Date(meeting.meetingDate), "dd MMM yyyy")}
					</div>
				</div>
				<Button
					onClick={() => onDelete(meeting.id)}
					variant="destructive"
					size="sm"
					className="bg-red-600 hover:bg-red-700"
				>
					<Trash2 className="w-4 h-4" />
				</Button>
			</div>

			{/* Content Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{/* Agenda */}
				<div className="bg-gray-700/30 rounded-lg p-4">
					<div className="flex items-center space-x-2 mb-3">
						<FileText className="w-4 h-4 text-blue-400" />
						<h4 className="text-sm font-semibold text-blue-400 uppercase">
							Agenda
						</h4>
					</div>
					<ul className="space-y-1">
						{meeting.agenda.map((item, index) => (
							<li
								key={index}
								className="text-sm text-gray-300 flex items-start"
							>
								<span className="text-orange-500 mr-2">{index + 1}.</span>
								{item}
							</li>
						))}
					</ul>
				</div>

				{/* Conclusion */}
				<div className="bg-gray-700/30 rounded-lg p-4">
					<h4 className="text-sm font-semibold text-green-400 uppercase mb-3">
						Conclusion
					</h4>
					<p className="text-sm text-gray-300">{meeting.conclusion}</p>
				</div>
			</div>

			{/* Remark */}
			{meeting.remark && (
				<div className="mt-4 bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
					<h4 className="text-sm font-semibold text-purple-400 uppercase mb-2">
						Remark
					</h4>
					<p className="text-sm text-gray-300">{meeting.remark}</p>
				</div>
			)}

			{/* Photos */}
			<div className="mt-4 grid grid-cols-2 gap-3">
				{meeting.attendancePhoto && (
					<div className="flex items-center space-x-2 text-sm text-gray-400 bg-gray-700/30 rounded-lg p-3">
						<Image className="w-4 h-4 text-blue-400" />
						<span>Attendance Photo</span>
					</div>
				)}
				{meeting.geoTagPhoto && (
					<div className="flex items-center space-x-2 text-sm text-gray-400 bg-gray-700/30 rounded-lg p-3">
						<MapPin className="w-4 h-4 text-green-400" />
						<span>Geo Tag Photo</span>
					</div>
				)}
			</div>
		</div>
	);
}