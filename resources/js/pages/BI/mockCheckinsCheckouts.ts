// Data para Check-ins y Check-outs del día
export const checkinsCheckoutsData = [
    { hora: "08:00", checkins: 2, checkouts: 5 },
    { hora: "09:00", checkins: 5, checkouts: 8 },
    { hora: "10:00", checkins: 8, checkouts: 12 },
    { hora: "11:00", checkins: 12, checkouts: 15 },
    { hora: "12:00", checkins: 15, checkouts: 10 },
    { hora: "13:00", checkins: 10, checkouts: 8 },
    { hora: "14:00", checkins: 18, checkouts: 5 },
    { hora: "15:00", checkins: 22, checkouts: 3 },
    { hora: "16:00", checkins: 15, checkouts: 2 },
    { hora: "17:00", checkins: 8, checkouts: 1 },
];

export const checkinsCheckoutsBarsConfig = [
    { dataKey: "checkins", name: "Check-ins", fill: "#10b981", radius: [8, 8, 0, 0] as [number, number, number, number] },
    { dataKey: "checkouts", name: "Check-outs", fill: "#ef4444", radius: [8, 8, 0, 0] as [number, number, number, number] },
];
