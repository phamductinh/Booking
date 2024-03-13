export const adminMenu = [
	{
		//quản lý người dùng
		name: "menu.admin.admin",
		menus: [
			{
				name: "menu.admin.manage-user",
				link: "/system/user-manage",
			},
			{
				name: "menu.doctor.manage-doctor",
				link: "/system/manage-doctor",
			},
		],
	},
	{
		//quản lý bac si
		name: "menu.doctor.doctor",
		menus: [
			{
				name: "menu.doctor.manage-booking",
				link: "/system/manage-booking",
			},
		],
	},
	{
		//quản lý specalty
		name: "menu.admin.manage-specialty",
		menus: [
			{
				name: "menu.admin.manage-specialty",
				link: "/system/manage-specialty",
			},
		],
	},
];
export const doctorMenu = [
	{
		//quản lý bac si
		name: "menu.doctor.doctor",
		menus: [
			{
				name: "menu.doctor.manage-booking",
				link: "/system/manage-booking",
			},
		],
	},
];
