export const stats = [
  {
    title: "Hospitals",
    value: 42,
    color: "bg-blue-500",
  },
  {
    title: "ICU Beds",
    value: 128,
    color: "bg-green-500",
  },
  {
    title: "Ambulances",
    value: 36,
    color: "bg-orange-500",
  },
  {
    title: "Today's Referrals",
    value: 57,
    color: "bg-purple-500",
  },
];

export const hospitals = [
  {
    id: 1,
    name: "Apollo Hospital",
    city: "Hyderabad",
    icu: 8,
    ambulance: 3,
    status: "Available",
  },
  {
    id: 2,
    name: "Yashoda Hospital",
    city: "Hyderabad",
    icu: 2,
    ambulance: 1,
    status: "Limited",
  },
  {
    id: 3,
    name: "CARE Hospital",
    city: "Hyderabad",
    icu: 0,
    ambulance: 2,
    status: "Full",
  },
];

export const referrals = [
  {
    patient: "Rahul",
    from: "Apollo",
    to: "CARE",
    status: "Accepted",
  },
  {
    patient: "Anita",
    from: "Yashoda",
    to: "Apollo",
    status: "Pending",
  },
  {
    patient: "Ravi",
    from: "CARE",
    to: "Yashoda",
    status: "Completed",
  },
];