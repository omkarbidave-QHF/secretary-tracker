import { auth } from "@/auth";
import { redirect } from "next/navigation";
import "./animation.css";
import {
	BookOpen,
	Users,
	FileText,
	BarChart2,
	Mail,
	Phone,
	MessageCircle,
	Video,
	Shield,
	Clock,
	CheckCircle,
	AlertCircle,
	Presentation,
	Activity,
	Megaphone,
	TrendingUp,
	CalendarDays,
	ClipboardList,
	Target,
	Link2,
	Upload,
	Save,
} from "lucide-react";

export default async function HelpPage() {
	const session = await auth();
	if (!session || session.user.role !== "SECRETARY") {
		redirect("/unauthorized");
	}

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
			<div className="max-w-7xl mx-auto">
				{/* Header with animations */}
				<div className="text-center mb-12 animate-fadeInUp">
					<div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mb-4 animate-float animate-pulse-glow">
						<BookOpen className="w-10 h-10 text-white" />
					</div>
					<h1 className="text-4xl font-bold mb-3 gradient-text">
						Secretary Help Center
					</h1>
					<p className="text-lg text-gray-600 dark:text-gray-400">
						Complete guide for managing presentations, warriors, meetings, and
						performance tracking
					</p>
				</div>

				{/* Quick Start Guide with staggered animation */}
				<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 hover-lift animate-scaleIn">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
						<CheckCircle className="w-6 h-6 text-green-500 mr-3" />
						Quick Start Guide
					</h2>
					<div className="grid md:grid-cols-4 gap-6">
						<div className="animate-fadeInUp delay-100">
							<QuickStartCard
								number="1"
								title="Setup Execution Plan"
								description="Define start and end dates to create weekly commitment tracker"
								icon={<ClipboardList className="w-6 h-6" />}
							/>
						</div>
						<div className="animate-fadeInUp delay-200">
							<QuickStartCard
								number="2"
								title="Track Warriors"
								description="Monitor individual cyber warrior performance and achievements"
								icon={<Shield className="w-6 h-6" />}
							/>
						</div>
						<div className="animate-fadeInUp delay-300">
							<QuickStartCard
								number="3"
								title="Record Activities"
								description="Document presentations, impact activities, and mass campaigns"
								icon={<Activity className="w-6 h-6" />}
							/>
						</div>
						<div className="animate-fadeInUp delay-400">
							<QuickStartCard
								number="4"
								title="Log Meetings"
								description="Maintain meeting records with agenda and conclusions"
								icon={<CalendarDays className="w-6 h-6" />}
							/>
						</div>
					</div>
				</div>

				{/* Planning Features with slide animations */}
				<div className="mb-8">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center animate-fadeInUp">
						<Target className="w-6 h-6 text-orange-500 mr-3" />
						Planning & Management
					</h2>
					<div className="grid md:grid-cols-2 gap-6">
						<div className="animate-slideInLeft hover-lift">
							<FeatureCard
								icon={<ClipboardList className="w-8 h-8 text-orange-500" />}
								title="Execution Plan"
								description="Weekly commitment and achievement tracking"
							>
								<ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
									<li className="flex items-start">
										<span className="text-orange-500 mr-2">•</span>
										Set start and tentative end dates for planning period
									</li>
									<li className="flex items-start">
										<span className="text-orange-500 mr-2">•</span>
										Define weekly commitments for presentations, students, and
										impact
									</li>
									<li className="flex items-start">
										<span className="text-orange-500 mr-2">•</span>
										Can only edit current week and upcoming week commitments
									</li>
									<li className="flex items-start">
										<span className="text-orange-500 mr-2">•</span>
										Once saved, commitments are locked and cannot be changed
									</li>
									<li className="flex items-start">
										<span className="text-orange-500 mr-2">•</span>
										Achieved values auto-populate from submitted reports
									</li>
								</ul>
							</FeatureCard>
						</div>

						<div className="animate-slideInRight hover-lift">
							<FeatureCard
								icon={<CalendarDays className="w-8 h-8 text-blue-500" />}
								title="Meeting Log"
								description="Document club meetings and decisions"
							>
								<ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
									<li className="flex items-start">
										<span className="text-blue-500 mr-2">•</span>
										Configure club information and member details
									</li>
									<li className="flex items-start">
										<span className="text-blue-500 mr-2">•</span>
										Add multiple agenda items for each meeting
									</li>
									<li className="flex items-start">
										<span className="text-blue-500 mr-2">•</span>
										Record conclusions and important remarks
									</li>
									<li className="flex items-start">
										<span className="text-blue-500 mr-2">•</span>
										Upload attendance photo and geo-tagged images
									</li>
									<li className="flex items-start">
										<span className="text-blue-500 mr-2">•</span>
										Track CM1, CM2, CM3 status for each member
									</li>
								</ul>
							</FeatureCard>
						</div>
					</div>
				</div>

				{/* Performance Tracking */}
				<div className="mb-8">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center animate-fadeInUp">
						<TrendingUp className="w-6 h-6 text-green-500 mr-3" />
						Performance Tracking
					</h2>
					<div className="grid md:grid-cols-2 gap-6">
						<div className="animate-slideInLeft hover-lift">
							<FeatureCard
								icon={<Shield className="w-8 h-8 text-purple-500" />}
								title="Warrior Performance"
								description="Individual cyber warrior activity tracking"
							>
								<ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
									<li className="flex items-start">
										<span className="text-purple-500 mr-2">•</span>
										Select cyber warrior from dropdown to view their data
									</li>
									<li className="flex items-start">
										<span className="text-purple-500 mr-2">•</span>
										View presentations with grade labels (5th-7th, 8th-10th,
										College)
									</li>
									<li className="flex items-start">
										<span className="text-purple-500 mr-2">•</span>
										Add media coverage links with date and URL
									</li>
									<li className="flex items-start">
										<span className="text-purple-500 mr-2">•</span>
										Add social media links for presentations and impact
										activities
									</li>
									<li className="flex items-start">
										<span className="text-purple-500 mr-2">•</span>
										Select frame challenges from dropdown and add date
									</li>
									<li className="flex items-start">
										<span className="text-purple-500 mr-2">•</span>
										All changes persist until you click &quot;Save Changes&quot;
									</li>
								</ul>
							</FeatureCard>
						</div>

						<div className="animate-slideInRight hover-lift">
							<FeatureCard
								icon={<TrendingUp className="w-8 h-8 text-emerald-500" />}
								title="Club Performance"
								description="Overall club metrics and achievements"
							>
								<ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
									<li className="flex items-start">
										<span className="text-emerald-500 mr-2">•</span>
										View overall commitment vs achievement statistics
									</li>
									<li className="flex items-start">
										<span className="text-emerald-500 mr-2">•</span>
										Switch between Global Metrics and Role Performance tabs
									</li>
									<li className="flex items-start">
										<span className="text-emerald-500 mr-2">•</span>
										Track President, Secretary, Media Director, and Activity
										Director
									</li>
									<li className="flex items-start">
										<span className="text-emerald-500 mr-2">•</span>
										Color-coded progress bars (Green 75%+, Blue 50%+, Yellow
										25%+)
									</li>
									<li className="flex items-start">
										<span className="text-emerald-500 mr-2">•</span>
										Monitor all key metrics: presentations, students, impact,
										media
									</li>
								</ul>
							</FeatureCard>
						</div>
					</div>
				</div>

				{/* Activity Recording with staggered cards */}
				<div className="grid md:grid-cols-3 gap-6 mb-8">
					<div className="animate-fadeInUp delay-100 hover-lift">
						<FeatureCard
							icon={<Presentation className="w-8 h-8 text-orange-500" />}
							title="Presentation Details"
							description="Record cyber awareness presentations"
						>
							<ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
								<li className="flex items-start">
									<span className="text-orange-500 mr-2">•</span>
									Enter school/college information and contact details
								</li>
								<li className="flex items-start">
									<span className="text-orange-500 mr-2">•</span>
									Record student counts by class and gender
								</li>
								<li className="flex items-start">
									<span className="text-orange-500 mr-2">•</span>
									Conduct digital behavior survey orally
								</li>
								<li className="flex items-start">
									<span className="text-orange-500 mr-2">•</span>
									Rate presentation quality and add remarks
								</li>
							</ul>
						</FeatureCard>
					</div>

					<div className="animate-fadeInUp delay-200 hover-lift">
						<FeatureCard
							icon={<Activity className="w-8 h-8 text-purple-500" />}
							title="Impact Activity"
							description="Document awareness campaigns"
						>
							<ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
								<li className="flex items-start">
									<span className="text-purple-500 mr-2">•</span>
									Record outreach activities and campaigns
								</li>
								<li className="flex items-start">
									<span className="text-purple-500 mr-2">•</span>
									Enter participant details and resources used
								</li>
								<li className="flex items-start">
									<span className="text-purple-500 mr-2">•</span>
									Upload supporting documents (PDF only)
								</li>
								<li className="flex items-start">
									<span className="text-purple-500 mr-2">•</span>
									Add media and social links via Warrior Performance
								</li>
							</ul>
						</FeatureCard>
					</div>

					<div className="animate-fadeInUp delay-300 hover-lift">
						<FeatureCard
							icon={<Megaphone className="w-8 h-8 text-pink-500" />}
							title="Mass Activity"
							description="Large-scale campaigns and rallies"
						>
							<ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
								<li className="flex items-start">
									<span className="text-pink-500 mr-2">•</span>
									Document mass events like rallies, nukkad natak
								</li>
								<li className="flex items-start">
									<span className="text-pink-500 mr-2">•</span>
									Add multiple social media and news links
								</li>
								<li className="flex items-start">
									<span className="text-pink-500 mr-2">•</span>
									Track participant count and stakeholders
								</li>
								<li className="flex items-start">
									<span className="text-pink-500 mr-2">•</span>
									Upload photos and media coverage proof
								</li>
							</ul>
						</FeatureCard>
					</div>
				</div>

				{/* Common Tasks */}
				<div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl shadow-xl p-8 mb-8 animate-scaleIn hover-lift">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
						<AlertCircle className="w-6 h-6 text-orange-500 mr-3" />
						Step-by-Step Guides
					</h2>
					<div className="grid md:grid-cols-2 gap-4">
						<TaskCard
							title="How to setup Execution Plan?"
							steps={[
								"Click 'Execution Plan' from sidebar",
								"Enter start date and tentative end date in modal",
								"Click 'Start Planning' to generate weeks",
								"Fill commitment values for current/upcoming weeks",
								"Click 'Save Week X Commitment' to lock it",
								"Past weeks and future weeks are automatically locked",
							]}
						/>
						<TaskCard
							title="How to track Warrior Performance?"
							steps={[
								"Go to 'Warrior Performance' from sidebar",
								"Select a cyber warrior from dropdown",
								"View their presentations and impact activities",
								"Click '+ Add' under Media Coverage or Social Media",
								"Enter date and URL, click 'Save'",
								"Links persist until you click 'Save Changes' button",
							]}
						/>
						<TaskCard
							title="How to add Frame Challenge?"
							steps={[
								"In Warrior Performance, scroll to Frame Challenges",
								"Click 'Add Challenge' button",
								"Select date for the challenge",
								"Choose challenge name from dropdown",
								"Click 'Save Challenge'",
								"Challenge appears in the list immediately",
							]}
						/>
						<TaskCard
							title="How to log a Meeting?"
							steps={[
								"Click 'Meeting Log' from sidebar",
								"Fill club name and member information",
								"Click 'Add Meeting' button",
								"Enter meeting number (e.g., Meeting_1) and date",
								"Add multiple agenda items using '+ Add Item'",
								"Write conclusion and optional remarks",
								"Upload attendance and geo-tag photos",
							]}
						/>
						<TaskCard
							title="How to view Club Performance?"
							steps={[
								"Go to 'Club Performance' from sidebar",
								"View overall commitment vs achievement summary",
								"Click 'Global Metrics' tab for activity breakdown",
								"Click 'Role Performance' tab for individual roles",
								"Each role shows specific metrics and percentages",
								"Color-coded progress indicates performance level",
							]}
						/>
						<TaskCard
							title="How to remove added links?"
							steps={[
								"Navigate to Warrior Performance page",
								"Select the warrior you want to edit",
								"Find the presentation or impact activity card",
								"Hover over the link you want to remove",
								"Click the trash icon that appears",
								"Link is removed immediately from the list",
							]}
						/>
						<TaskCard
							title="Why can't I edit a week's commitment?"
							steps={[
								"Execution Plan allows editing current and next week only",
								"Past weeks are locked automatically",
								"Future weeks unlock when they become current/upcoming",
								"Once you save a week's commitment, it's permanently locked",
								"This ensures data integrity and prevents backdating",
							]}
						/>
						<TaskCard
							title="What if I forget to save changes?"
							steps={[
								"Warrior Performance changes are stored temporarily",
								"If you refresh or leave page, unsaved changes are lost",
								"Always click 'Save Changes' button before leaving",
								"Green toast notification confirms successful save",
								"Meeting Log and Execution Plan auto-save individually",
							]}
						/>
					</div>
				</div>

				{/* Dashboard Overview */}
				<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 animate-scaleIn hover-lift">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
						<BarChart2 className="w-6 h-6 text-green-500 mr-3" />
						Dashboard Overview
					</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						<DashboardCard
							icon={<ClipboardList className="w-6 h-6 text-orange-500" />}
							title="Execution Plan"
							description="Weekly commitment tracker with auto-locking"
						/>
						<DashboardCard
							icon={<Shield className="w-6 h-6 text-purple-500" />}
							title="Warrior Performance"
							description="Individual tracking with media links"
						/>
						<DashboardCard
							icon={<CalendarDays className="w-6 h-6 text-blue-500" />}
							title="Meeting Log"
							description="Club meeting documentation"
						/>
						<DashboardCard
							icon={<TrendingUp className="w-6 h-6 text-emerald-500" />}
							title="Club Performance"
							description="Overall metrics and role-wise breakdown"
						/>
						<DashboardCard
							icon={<Presentation className="w-6 h-6 text-orange-500" />}
							title="Presentations"
							description="Cyber awareness session reports"
						/>
						<DashboardCard
							icon={<Activity className="w-6 h-6 text-purple-500" />}
							title="Impact Activities"
							description="Awareness campaign documentation"
						/>
						<DashboardCard
							icon={<Megaphone className="w-6 h-6 text-pink-500" />}
							title="Mass Activities"
							description="Large-scale event tracking"
						/>
						<DashboardCard
							icon={<BarChart2 className="w-6 h-6 text-green-500" />}
							title="Analytics"
							description="Data insights and trends"
						/>
					</div>
				</div>

				{/* Pro Tips */}
				<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 animate-scaleIn hover-lift">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
						<Shield className="w-6 h-6 text-orange-500 mr-3" />
						Pro Tips
					</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						<TipCard
							icon="📅"
							title="Plan Weekly"
							description="Set realistic commitments at the start of each week. Review execution plan every Monday morning"
						/>
						<TipCard
							icon="🔗"
							title="Add Links Promptly"
							description="Add media coverage and social media links as soon as activities are published online"
						/>
						<TipCard
							icon="💾"
							title="Save Frequently"
							description="Click 'Save Changes' in Warrior Performance after adding each set of links"
						/>
						<TipCard
							icon="📝"
							title="Meeting Documentation"
							description="Document meetings within 24 hours while details are fresh in memory"
						/>
						<TipCard
							icon="📊"
							title="Monitor Progress"
							description="Check Club Performance dashboard weekly to track overall achievements"
						/>
						<TipCard
							icon="🎯"
							title="Frame Challenges"
							description="Encourage warriors to complete frame challenges and add them immediately"
						/>
						<TipCard
							icon="⏰"
							title="Lock Commitments"
							description="Save week commitments by Friday to avoid last-minute rush"
						/>
						<TipCard
							icon="✅"
							title="Verify Links"
							description="Test all URLs before saving to ensure they're accessible and correct"
						/>
						<TipCard
							icon="📸"
							title="Upload Quality Photos"
							description="Use clear, well-lit photos for meeting attendance and geo-tagging"
						/>
					</div>
				</div>

				{/* Contact Support */}
				<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 animate-scaleIn hover-lift">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
						Need More Help?
					</h2>
					<p className="text-center text-gray-600 dark:text-gray-400 mb-8">
						Our support team is here to assist you
					</p>
					<div className="grid md:grid-cols-3 gap-6">
						<ContactCard
							icon={<Mail className="w-6 h-6 text-orange-500" />}
							title="Email Support"
							content="secretary@quickheal.com"
							description="We'll respond within 24 hours"
						/>
						<ContactCard
							icon={<Phone className="w-6 h-6 text-blue-500" />}
							title="Phone Support"
							content="+91 1800-XXX-XXXX"
							description="Mon-Fri, 9 AM - 6 PM IST"
						/>
						<ContactCard
							icon={<MessageCircle className="w-6 h-6 text-green-500" />}
							title="Live Chat"
							content="Click to Chat"
							description="Available 24/7"
						/>
					</div>
				</div>

				{/* Video Tutorials */}
				<div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl shadow-xl p-8 animate-scaleIn hover-lift">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
						<Video className="w-6 h-6 text-blue-500 mr-3" />
						Video Tutorials
					</h2>
					<div className="grid md:grid-cols-4 gap-6">
						<VideoCard
							title="Execution Plan Setup"
							duration="5 min"
							thumbnail="📅"
						/>
						<VideoCard
							title="Warrior Performance"
							duration="8 min"
							thumbnail="🛡️"
						/>
						<VideoCard
							title="Meeting Documentation"
							duration="6 min"
							thumbnail="📝"
						/>
						<VideoCard
							title="Club Performance Dashboard"
							duration="7 min"
							thumbnail="📊"
						/>
						<VideoCard
							title="Recording Presentations"
							duration="7 min"
							thumbnail="🎬"
						/>
						<VideoCard
							title="Adding Media Links"
							duration="4 min"
							thumbnail="🔗"
						/>
						<VideoCard
							title="Frame Challenges"
							duration="5 min"
							thumbnail="🖼️"
						/>
						<VideoCard
							title="Mass Activity Reports"
							duration="8 min"
							thumbnail="📢"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

// Helper Components
function QuickStartCard({
	number,
	title,
	description,
	icon,
}: {
	number: string;
	title: string;
	description: string;
	icon: React.ReactNode;
}) {
	return (
		<div className="relative bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-6 border-2 border-orange-200 dark:border-gray-600 hover-lift">
			<div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg animate-pulse-glow">
				{number}
			</div>
			<div className="mt-4 mb-3 text-orange-600 dark:text-orange-400">
				{icon}
			</div>
			<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
				{title}
			</h3>
			<p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
		</div>
	);
}

function FeatureCard({
	icon,
	title,
	description,
	children,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
	children: React.ReactNode;
}) {
	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow h-full">
			<div className="flex items-start mb-4">
				<div className="mr-4">{icon}</div>
				<div>
					<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
						{title}
					</h3>
					<p className="text-sm text-gray-600 dark:text-gray-400">
						{description}
					</p>
				</div>
			</div>
			{children}
		</div>
	);
}

function TaskCard({ title, steps }: { title: string; steps: string[] }) {
	return (
		<div className="bg-white dark:bg-gray-700 rounded-lg p-5 border border-orange-200 dark:border-gray-600 hover-lift">
			<h3 className="font-semibold text-gray-900 dark:text-white mb-3">
				{title}
			</h3>
			<ol className="space-y-2">
				{steps.map((step, index) => (
					<li
						key={index}
						className="flex items-start text-sm text-gray-600 dark:text-gray-400"
					>
						<span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 text-white text-xs font-bold mr-2 flex-shrink-0 mt-0.5">
							{index + 1}
						</span>
						{step}
					</li>
				))}
			</ol>
		</div>
	);
}

function DashboardCard({
	icon,
	title,
	description,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
}) {
	return (
		<div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow hover-lift">
			<div className="flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-600 rounded-full mb-4">
				{icon}
			</div>
			<h3 className="font-semibold text-gray-900 dark:text-white mb-2">
				{title}
			</h3>
			<p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
		</div>
	);
}

function ContactCard({
	icon,
	title,
	content,
	description,
}: {
	icon: React.ReactNode;
	title: string;
	content: string;
	description: string;
}) {
	return (
		<div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-md transition-shadow hover-lift">
			<div className="inline-flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-600 rounded-full mb-4">
				{icon}
			</div>
			<h3 className="font-semibold text-gray-900 dark:text-white mb-2">
				{title}
			</h3>
			<p className="text-orange-600 dark:text-orange-400 font-medium mb-1">
				{content}
			</p>
			<p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
		</div>
	);
}

function VideoCard({
	title,
	duration,
	thumbnail,
}: {
	title: string;
	duration: string;
	thumbnail: string;
}) {
	return (
		<div className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer hover-lift">
			<div className="h-40 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-6xl relative overflow-hidden">
				<div className="shimmer absolute inset-0"></div>
				{thumbnail}
			</div>
			<div className="p-4">
				<h3 className="font-semibold text-gray-900 dark:text-white mb-1">
					{title}
				</h3>
				<div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
					<Clock className="w-4 h-4 mr-1" />
					{duration}
				</div>
			</div>
		</div>
	);
}

function TipCard({
	icon,
	title,
	description,
}: {
	icon: string;
	title: string;
	description: string;
}) {
	return (
		<div className="flex items-start bg-gray-50 dark:bg-gray-700 rounded-lg p-5 hover-lift">
			<div className="text-3xl mr-4 animate-float">{icon}</div>
			<div>
				<h3 className="font-semibold text-gray-900 dark:text-white mb-2">
					{title}
				</h3>
				<p className="text-sm text-gray-600 dark:text-gray-400">
					{description}
				</p>
			</div>
		</div>
	);
}