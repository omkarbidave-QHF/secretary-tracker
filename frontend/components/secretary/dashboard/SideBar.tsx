"use client";

import {
	Home,
	Users,
	HelpCircle,
	MoreHorizontal,
	LogOut,
	ClipboardList,
	Presentation,
	Megaphone,
	Shield,
	TrendingUp,
	CalendarDays,
} from "lucide-react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { logOut } from "@/hooks/user";
import { useSessionContext } from "@/context/session";
import Image from "next/image";

const Sidebar = () => {
	const { session } = useSessionContext();
	const [showLogoutAlert, setShowLogoutAlert] = React.useState(false);
	const [showProfileDialog, setShowProfileDialog] = React.useState(false);
	const [isPending, startTransition] = React.useTransition();
	const pathname = usePathname();
	const router = useRouter();

	const handleLogout = () => {
		setShowLogoutAlert(false);
		startTransition(async () => {
			await logOut();
		});
	};
	return (
		<aside className="w-64 flex-shrink-0 bg-gray-900 p-4 flex flex-col h-screen">
			{/* Top Section */}
			<div className="flex flex-col flex-1">
				{/* Logo */}
				<div className="flex items-center justify-center mb-8">
					<Image
						src={"/logo-dark.svg"}
						alt="Quick Heal"
						width={120}
						height={40}
						className="h-16 w-auto"
						priority
					/>
				</div>

				{/* Navigation */}
				<nav className="space-y-2 flex-1">
					{/* Dashboard Section */}
					<p className="px-3 text-xs font-semibold text-gray-500 uppercase">
						Overview
					</p>
					<NavItem
						icon={<Home size={20} />}
						label="Dashboard"
						to="/secretary/dashboard"
						pathname={pathname}
						router={router}
					/>

					{/* Planning Section */}
					<p className="px-3 pt-4 text-xs font-semibold text-gray-500 uppercase">
						Planning
					</p>
					<NavItem
						icon={<ClipboardList size={20} />}
						label="Execution Plan"
						to="/secretary/execution-plan"
						pathname={pathname}
						router={router}
					/>
					<NavItem
						icon={<CalendarDays size={20} />}
						label="Meeting Log"
						to="/secretary/meeting"
						pathname={pathname}
						router={router}
					/>

					{/* Performance Section */}
					<p className="px-3 pt-4 text-xs font-semibold text-gray-500 uppercase">
						Performance
					</p>
					<NavItem
						icon={<Shield size={20} />}
						label="Warrior Performance"
						to="/secretary/warrior-performance"
						pathname={pathname}
						router={router}
					/>
					<NavItem
						icon={<TrendingUp size={20} />}
						label="Club Performance"
						to="/secretary/club-performance"
						pathname={pathname}
						router={router}
					/>

					{/* Reports Section */}
					<p className="px-3 pt-4 text-xs font-semibold text-gray-500 uppercase">
						Reports
					</p>
					<NavItem
						icon={<Presentation size={20} />}
						label="Presentation Details"
						to="/secretary/presentation-details"
						pathname={pathname}
						router={router}
					/>
					<NavItem
						icon={<Users size={20} />}
						label="Impact Details"
						to="/secretary/impact-details"
						pathname={pathname}
						router={router}
					/>
					<NavItem
						icon={<Megaphone size={20} />}
						label="Mass Activity"
						to="/secretary/mass-activity"
						pathname={pathname}
						router={router}
					/>
				</nav>
			</div>

			{/* Bottom Section */}
			<div className="mt-auto">
				<div
					className="p-3 hover:bg-gray-800 rounded-md cursor-pointer text-gray-300 flex items-center"
					onClick={() => router.push("/secretary/help")}
				>
					<HelpCircle size={20} className="mr-3" /> Get Help
				</div>
				<div className="border-t border-gray-700 mt-4 pt-4 flex items-center justify-between">
					<div className="flex items-center flex-1 min-w-0">
						<Avatar className="flex-shrink-0">
							<AvatarImage
								src="https://placehold.co/40x40/2D3748/E2E8F0?text=T"
								alt="Teacher"
							/>
							<AvatarFallback>T</AvatarFallback>
						</Avatar>
						<div className="ml-3 flex-1 min-w-0">
							<p className="text-xs font-semibold text-white truncate">
								{session?.user.name || "User"}
							</p>
							<p className="text-xs text-gray-400 truncate">
								{session?.user.email || ""}
							</p>
						</div>
						<div className="ml-3">
							<DropdownMenu modal={false}>
								<DropdownMenuTrigger asChild>
									<button
										className="text-gray-400 hover:text-white transition-colors focus:outline-none ml-2 flex-shrink-0"
										disabled={isPending}
									>
										<MoreHorizontal size={20} className="cursor-pointer" />
									</button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									align="end"
									className="w-56 bg-gray-800 border-gray-700 text-gray-100"
								>
									<DropdownMenuLabel className="text-gray-400 font-normal">
										Account Options
									</DropdownMenuLabel>
									<DropdownMenuSeparator className="bg-gray-700" />
									{/* <DropdownMenuItem
										onClick={() => setShowProfileDialog(true)}
										disabled={isPending}
										className="cursor-pointer hover:bg-gray-700 focus:bg-gray-700 focus:text-white"
									>
										<User size={16} className="mr-2" />
										Show Profile
									</DropdownMenuItem> */}
									<DropdownMenuItem
										onClick={() => setShowLogoutAlert(true)}
										disabled={isPending}
										className="cursor-pointer text-red-400 hover:bg-gray-700 hover:text-red-300 focus:bg-gray-700 focus:text-red-300"
									>
										<LogOut size={16} className="mr-2" />
										Logout
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</div>
			</div>

			<AlertDialog open={showLogoutAlert} onOpenChange={setShowLogoutAlert}>
				<AlertDialogContent className="bg-gray-800 border-gray-700 text-gray-100">
					<AlertDialogHeader>
						<AlertDialogTitle className="text-xl">
							Are you sure you want to logout?
						</AlertDialogTitle>
						<AlertDialogDescription className="text-gray-400">
							You will be signed out of your account and redirected to the login
							page. Any unsaved changes will be lost.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel
							className="bg-gray-700 hover:bg-gray-600 text-gray-100 border-gray-600"
							disabled={isPending}
						>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleLogout}
							disabled={isPending}
							className="bg-red-600 hover:bg-red-700 text-white"
						>
							{isPending ? "Logging out..." : "Logout"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</aside>
	);
};

const NavItem = ({
	icon,
	label,
	to,
	pathname,
	router,
}: {
	icon: React.ReactNode;
	label: string;
	to: string;
	pathname: string | null;
	router: ReturnType<typeof useRouter>;
}) => {
	const isActive = pathname === to;

	return (
		<div
			onClick={() => router.push(to)}
			className={`flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer ${isActive
				? "bg-gray-800 text-white"
				: "text-gray-400 hover:bg-gray-800 hover:text-white"
				}`}
		>
			{icon}
			<span className="ml-3">{label}</span>
		</div>
	);
};

export default Sidebar;
