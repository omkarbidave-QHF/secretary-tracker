"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FeedbackForm5_7Props {
	totalStudents: number;
	presentationId: string;
}

export default function FeedbackForm5_7({
	totalStudents,
	presentationId,
}: FeedbackForm5_7Props) {
	const router = useRouter();
	const { toast } = useToast();
	const [isPending, startTransition] = useTransition();
	const [responseCounts, setResponseCounts] = useState({
		// Pre-Survey
		q1_mobile: 0,
		q1_tablet: 0,
		q1_laptop: 0,
		q1_other: 0,
		q2_less1: 0,
		q2_1to3: 0,
		q2_4to6: 0,
		q2_more6: 0,
		q4_knowBetter: 0,
		q4_sometimes: 0,
		// Post-Survey
		p1_diary: 0,
		p1_noChange: 0,
		p2_setLimits: 0,
		p2_keepScrolling: 0,
		p2_notSure: 0,
		p3_pauseCheck: 0,
		p3_justDownload: 0,
		p4_doneSharing: 0,
		p4_mightStill: 0,
		p4_alreadySafe: 0,
	});

	const [validationErrors, setValidationErrors] = useState<string[]>([]);
	const [topApps, setTopApps] = useState(["", "", ""]);

	const getQuestionTotal = (keys: string[]) => {
		return keys.reduce(
			(sum, key) =>
				sum + (responseCounts[key as keyof typeof responseCounts] || 0),
			0
		);
	};

	const validateForm = () => {
		const errors: string[] = [];

		const questions = [
			{
				keys: ["q1_mobile", "q1_tablet", "q1_laptop", "q1_other"],
				label: "Q1",
			},
			{ keys: ["q2_less1", "q2_1to3", "q2_4to6", "q2_more6"], label: "Q2" },
			{ keys: ["q4_knowBetter", "q4_sometimes"], label: "Q4" },
			{ keys: ["p1_diary", "p1_noChange"], label: "Post-Q1" },
			{
				keys: ["p2_setLimits", "p2_keepScrolling", "p2_notSure"],
				label: "Post-Q2",
			},
			{ keys: ["p3_pauseCheck", "p3_justDownload"], label: "Post-Q3" },
			{
				keys: ["p4_doneSharing", "p4_mightStill", "p4_alreadySafe"],
				label: "Post-Q4",
			},
		];

		questions.forEach(({ keys, label }) => {
			const total = getQuestionTotal(keys);
			if (total !== totalStudents) {
				errors.push(
					`${label}: Total responses (${total}) must equal ${totalStudents} students`
				);
			}
		});

		setValidationErrors(errors);
		return errors.length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		startTransition(async () => {
			if (validateForm()) {
				try {
					const feedbackData = {
						presentationId,
						totalStudents,
						responseCounts,
						topApps,
						classGroup: "5-7",
					};
					console.log("Feedback Data:", feedbackData);

					const response = await fetch(`/api/secretary/presentation-feedback/${presentationId}`, {
						method: "PATCH",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ feedbackData }),
					});

					if (!response.ok) throw new Error("Failed to save feedback");

					toast({
						title: "Success",
						description: "Feedback submitted successfully!",
					});

					router.push("/secretary/dashboard");
				} catch (error) {
					console.error("Error saving feedback:", error);
					toast({
						title: "Error",
						description: "Failed to submit feedback. Please try again.",
						variant: "destructive",
					});
				}
			}
		});
	};

	const updateResponse = (key: string, value: number) => {
		setResponseCounts((prev) => ({
			...prev,
			[key]: Math.max(0, Math.min(value, totalStudents)),
		}));
	};

	return (
		<div className="max-w-6xl mx-auto">
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="text-3xl font-bold text-gray-100">
						Digital Behavior Survey - STD 5-7
					</h1>
					<p className="text-gray-400 mt-2">
						Total Students:{" "}
						<span className="text-orange-400 font-bold">{totalStudents}</span>
					</p>
				</div>
				<Button
					onClick={() => router.back()}
					variant="outline"
					className="border-gray-600 text-black hover:bg-red-700 hover:text-black"
				>
					← Back
				</Button>
			</div>

			{validationErrors.length > 0 && (
				<Alert className="mb-6 bg-red-900/20 border-red-700">
					<AlertCircle className="h-4 w-4 text-red-400" />
					<AlertDescription className="text-red-300">
						<p className="font-semibold mb-2">
							Please fix the following errors:
						</p>
						<ul className="list-disc list-inside space-y-1">
							{validationErrors.map((error, idx) => (
								<li key={idx}>{error}</li>
							))}
						</ul>
					</AlertDescription>
				</Alert>
			)}

			<div className="bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700">
				<p className="text-gray-300 mb-6">
					Enter the number of students who raised their hands for each response
					option.
					<span className="text-orange-400 font-semibold">
						{" "}
						Total for each question must equal {totalStudents}.
					</span>
				</p>

				<form onSubmit={handleSubmit} className="space-y-8">
					{/* Pre-Survey */}
					<fieldset className="border border-green-700 rounded-lg p-6 bg-green-900/10">
						<legend className="text-lg font-semibold text-green-400 px-3">
							✅ Pre-Survey (Before Presentation)
						</legend>

						<div className="space-y-8 mt-4">
							{/* Q1 */}
							<div className="bg-gray-800/50 p-4 rounded-lg">
								<Label className="text-base font-medium text-gray-200 block mb-3">
									1. What&apos;s your go-to device when you need to explore the
									internet world?
								</Label>
								<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
									{[
										{ label: "Mobile", key: "q1_mobile" },
										{ label: "Tablet", key: "q1_tablet" },
										{ label: "Laptop", key: "q1_laptop" },
										{ label: "Other", key: "q1_other" },
									].map(({ label, key }) => (
										<div key={key}>
											<Label className="text-gray-400 text-sm">{label}</Label>
											<Input
												type="number"
												min="0"
												max={totalStudents}
												value={
													responseCounts[key as keyof typeof responseCounts]
												}
												onChange={(e) =>
													updateResponse(key, Number(e.target.value))
												}
												className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
											/>
										</div>
									))}
								</div>
								<p
									className={`mt-2 text-sm ${getQuestionTotal([
										"q1_mobile",
										"q1_tablet",
										"q1_laptop",
										"q1_other",
									]) === totalStudents
										? "text-green-400"
										: "text-red-400"
										}`}
								>
									Total:{" "}
									{getQuestionTotal([
										"q1_mobile",
										"q1_tablet",
										"q1_laptop",
										"q1_other",
									])}{" "}
									/ {totalStudents}
									{getQuestionTotal([
										"q1_mobile",
										"q1_tablet",
										"q1_laptop",
										"q1_other",
									]) === totalStudents && " ✓"}
								</p>
							</div>

							{/* Q2 */}
							<div className="bg-gray-800/50 p-4 rounded-lg">
								<Label className="text-base font-medium text-gray-200 block mb-3">
									2. Imagine it&apos;s your regular day -- how often do you find
									yourself online?
								</Label>
								<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
									{[
										{ label: "Less than 1 hour", key: "q2_less1" },
										{ label: "1-3 hours", key: "q2_1to3" },
										{ label: "4-6 hours", key: "q2_4to6" },
										{ label: "More than 6 hours", key: "q2_more6" },
									].map(({ label, key }) => (
										<div key={key}>
											<Label className="text-gray-400 text-sm">{label}</Label>
											<Input
												type="number"
												min="0"
												max={totalStudents}
												value={
													responseCounts[key as keyof typeof responseCounts]
												}
												onChange={(e) =>
													updateResponse(key, Number(e.target.value))
												}
												className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
											/>
										</div>
									))}
								</div>
								<p
									className={`mt-2 text-sm ${getQuestionTotal([
										"q2_less1",
										"q2_1to3",
										"q2_4to6",
										"q2_more6",
									]) === totalStudents
										? "text-green-400"
										: "text-red-400"
										}`}
								>
									Total:{" "}
									{getQuestionTotal([
										"q2_less1",
										"q2_1to3",
										"q2_4to6",
										"q2_more6",
									])}{" "}
									/ {totalStudents}
									{getQuestionTotal([
										"q2_less1",
										"q2_1to3",
										"q2_4to6",
										"q2_more6",
									]) === totalStudents && " ✓"}
								</p>
							</div>

							{/* Q3 - Top Apps */}
							<div className="bg-gray-800/50 p-4 rounded-lg">
								<Label className="text-base font-medium text-gray-200 block mb-3">
									3. Top 3 apps/games mentioned by students
								</Label>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									{[0, 1, 2].map((index) => (
										<div key={index}>
											<Label className="text-gray-400 text-sm">
												App/Game {index + 1}
											</Label>
											<Input
												placeholder={`App/Game ${index + 1}`}
												value={topApps[index]}
												onChange={(e) => {
													const newApps = [...topApps];
													newApps[index] = e.target.value;
													setTopApps(newApps);
												}}
												className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 mt-1"
											/>
										</div>
									))}
								</div>
							</div>

							{/* Q4 */}
							<div className="bg-gray-800/50 p-4 rounded-lg">
								<Label className="text-base font-medium text-gray-200 block mb-3">
									4. Do you ever post or share your real info online?
								</Label>
								<div className="grid grid-cols-2 gap-4">
									{[
										{ label: "I know better", key: "q4_knowBetter" },
										{ label: "Sometimes...", key: "q4_sometimes" },
									].map(({ label, key }) => (
										<div key={key}>
											<Label className="text-gray-400 text-sm">{label}</Label>
											<Input
												type="number"
												min="0"
												max={totalStudents}
												value={
													responseCounts[key as keyof typeof responseCounts]
												}
												onChange={(e) =>
													updateResponse(key, Number(e.target.value))
												}
												className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
											/>
										</div>
									))}
								</div>
								<p
									className={`mt-2 text-sm ${getQuestionTotal(["q4_knowBetter", "q4_sometimes"]) ===
										totalStudents
										? "text-green-400"
										: "text-red-400"
										}`}
								>
									Total: {getQuestionTotal(["q4_knowBetter", "q4_sometimes"])} /{" "}
									{totalStudents}
									{getQuestionTotal(["q4_knowBetter", "q4_sometimes"]) ===
										totalStudents && " ✓"}
								</p>
							</div>
						</div>
					</fieldset>

					{/* Post-Survey */}
					<fieldset className="border border-blue-700 rounded-lg p-6 bg-blue-900/10">
						<legend className="text-lg font-semibold text-blue-400 px-3">
							✅ Post-Survey (After Presentation)
						</legend>

						<div className="space-y-8 mt-4">
							{/* P1 */}
							<div className="bg-gray-800/50 p-4 rounded-lg">
								<Label className="text-base font-medium text-gray-200 block mb-3">
									1. Now that you&apos;ve unlocked the truth about cyber risks,
									how will you treat your device going forward?
								</Label>
								<div className="grid grid-cols-2 gap-4">
									{[
										{ label: "Like a digital diary", key: "p1_diary" },
										{
											label: "No big change, I think I'm already safe",
											key: "p1_noChange",
										},
									].map(({ label, key }) => (
										<div key={key}>
											<Label className="text-gray-400 text-sm">{label}</Label>
											<Input
												type="number"
												min="0"
												max={totalStudents}
												value={
													responseCounts[key as keyof typeof responseCounts]
												}
												onChange={(e) =>
													updateResponse(key, Number(e.target.value))
												}
												className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
											/>
										</div>
									))}
								</div>
								<p
									className={`mt-2 text-sm ${getQuestionTotal(["p1_diary", "p1_noChange"]) ===
										totalStudents
										? "text-green-400"
										: "text-red-400"
										}`}
								>
									Total: {getQuestionTotal(["p1_diary", "p1_noChange"])} /{" "}
									{totalStudents}
									{getQuestionTotal(["p1_diary", "p1_noChange"]) ===
										totalStudents && " ✓"}
								</p>
							</div>

							{/* P2 */}
							<div className="bg-gray-800/50 p-4 rounded-lg">
								<Label className="text-base font-medium text-gray-200 block mb-3">
									2. What&apos;s your screen time plan now?
								</Label>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									{[
										{ label: "Set limits", key: "p2_setLimits" },
										{ label: "Keep scrolling", key: "p2_keepScrolling" },
										{ label: "Not sure", key: "p2_notSure" },
									].map(({ label, key }) => (
										<div key={key}>
											<Label className="text-gray-400 text-sm">{label}</Label>
											<Input
												type="number"
												min="0"
												max={totalStudents}
												value={
													responseCounts[key as keyof typeof responseCounts]
												}
												onChange={(e) =>
													updateResponse(key, Number(e.target.value))
												}
												className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
											/>
										</div>
									))}
								</div>
								<p
									className={`mt-2 text-sm ${getQuestionTotal([
										"p2_setLimits",
										"p2_keepScrolling",
										"p2_notSure",
									]) === totalStudents
										? "text-green-400"
										: "text-red-400"
										}`}
								>
									Total:{" "}
									{getQuestionTotal([
										"p2_setLimits",
										"p2_keepScrolling",
										"p2_notSure",
									])}{" "}
									/ {totalStudents}
									{getQuestionTotal([
										"p2_setLimits",
										"p2_keepScrolling",
										"p2_notSure",
									]) === totalStudents && " ✓"}
								</p>
							</div>

							{/* P3 */}
							<div className="bg-gray-800/50 p-4 rounded-lg">
								<Label className="text-base font-medium text-gray-200 block mb-3">
									3. App asks too many permissions --- what will you do?
								</Label>
								<div className="grid grid-cols-2 gap-4">
									{[
										{ label: "Pause & check", key: "p3_pauseCheck" },
										{ label: "Just download", key: "p3_justDownload" },
									].map(({ label, key }) => (
										<div key={key}>
											<Label className="text-gray-400 text-sm">{label}</Label>
											<Input
												type="number"
												min="0"
												max={totalStudents}
												value={
													responseCounts[key as keyof typeof responseCounts]
												}
												onChange={(e) =>
													updateResponse(key, Number(e.target.value))
												}
												className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
											/>
										</div>
									))}
								</div>
								<p
									className={`mt-2 text-sm ${getQuestionTotal(["p3_pauseCheck", "p3_justDownload"]) ===
										totalStudents
										? "text-green-400"
										: "text-red-400"
										}`}
								>
									Total:{" "}
									{getQuestionTotal(["p3_pauseCheck", "p3_justDownload"])} /{" "}
									{totalStudents}
									{getQuestionTotal(["p3_pauseCheck", "p3_justDownload"]) ===
										totalStudents && " ✓"}
								</p>
							</div>

							{/* P4 */}
							<div className="bg-gray-800/50 p-4 rounded-lg">
								<Label className="text-base font-medium text-gray-200 block mb-3">
									4. Sharing personal info online --- your take?
								</Label>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									{[
										{ label: "Done sharing", key: "p4_doneSharing" },
										{ label: "Might still share", key: "p4_mightStill" },
										{ label: "I already stay safe", key: "p4_alreadySafe" },
									].map(({ label, key }) => (
										<div key={key}>
											<Label className="text-gray-400 text-sm">{label}</Label>
											<Input
												type="number"
												min="0"
												max={totalStudents}
												value={
													responseCounts[key as keyof typeof responseCounts]
												}
												onChange={(e) =>
													updateResponse(key, Number(e.target.value))
												}
												className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
											/>
										</div>
									))}
								</div>
								<p
									className={`mt-2 text-sm ${getQuestionTotal([
										"p4_doneSharing",
										"p4_mightStill",
										"p4_alreadySafe",
									]) === totalStudents
										? "text-green-400"
										: "text-red-400"
										}`}
								>
									Total:{" "}
									{getQuestionTotal([
										"p4_doneSharing",
										"p4_mightStill",
										"p4_alreadySafe",
									])}{" "}
									/ {totalStudents}
									{getQuestionTotal([
										"p4_doneSharing",
										"p4_mightStill",
										"p4_alreadySafe",
									]) === totalStudents && " ✓"}
								</p>
							</div>
						</div>
					</fieldset>

					{/* Submit */}
					<div className="flex gap-4">
						<Button
							type="submit"
							disabled={isPending}
							className="flex-1 py-4 font-semibold text-white rounded-lg shadow-md bg-orange-500 hover:bg-orange-600"
						>
							{isPending ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Submitting...
								</>
							) : (
								"Submit Survey"
							)}
						</Button>
						<Button
							type="button"
							onClick={() => router.back()}
							variant="outline"
							className="px-8 py-4 border-red-300 text-black hover:bg-red-700 hover:text-white"
						>
							Cancel
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
