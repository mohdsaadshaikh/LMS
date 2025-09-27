import { PrismaClient } from "@prisma/client";
const members = [
  {
    name: "Arjun Mehta",
    fatherName: "Rakesh Mehta",
    cnic: "35220-1234561-1",
    phone: "03111234561",
    address: "12 Nehru Street, Mumbai",
    qualification: "BSc Physics",
    regNo: "REG20250001",
    cardExpiresAt: new Date("2027-09-26T00:00:00.000Z"),
  },
  {
    name: "Rohit Sharma",
    fatherName: "Suresh Sharma",
    cnic: "35220-1234562-2",
    phone: "03111234562",
    address: "45 Gandhi Road, Delhi",
    qualification: "BA Economics",
    regNo: "REG20250002",
    cardExpiresAt: new Date("2027-09-26T00:00:00.000Z"),
  },
  {
    name: "Amit Verma",
    fatherName: "Rajesh Verma",
    cnic: "35220-1234563-3",
    phone: "03111234563",
    address: "78 Patel Nagar, Jaipur",
    qualification: "BCom",
    regNo: "REG20250003",
    cardExpiresAt: new Date("2027-09-26T00:00:00.000Z"),
  },
  {
    name: "Karan Malhotra",
    fatherName: "Anil Malhotra",
    cnic: "35220-1234564-4",
    phone: "03111234564",
    address: "90 Connaught Place, Delhi",
    qualification: "MBA",
    regNo: "REG20250004",
    cardExpiresAt: new Date("2027-09-26T00:00:00.000Z"),
  },
  {
    name: "Sanjay Kapoor",
    fatherName: "Vijay Kapoor",
    cnic: "35220-1234565-5",
    phone: "03111234565",
    address: "34 Marine Drive, Mumbai",
    qualification: "BSc Chemistry",
    regNo: "REG20250005",
    cardExpiresAt: new Date("2027-09-26T00:00:00.000Z"),
  },
  {
    name: "Vikram Singh",
    fatherName: "Pratap Singh",
    cnic: "35220-1234566-6",
    phone: "03111234566",
    address: "11 Residency Road, Lucknow",
    qualification: "BA Political Science",
    regNo: "REG20250006",
    cardExpiresAt: new Date("2027-09-26T00:00:00.000Z"),
  },
  {
    name: "Nikhil Joshi",
    fatherName: "Manoj Joshi",
    cnic: "35220-1234567-7",
    phone: "03111234567",
    address: "56 Park Street, Kolkata",
    qualification: "BTech Computer Science",
    regNo: "REG20250007",
    cardExpiresAt: new Date("2027-09-26T00:00:00.000Z"),
  },
  {
    name: "Ravi Iyer",
    fatherName: "Shankar Iyer",
    cnic: "35220-1234568-8",
    phone: "03111234568",
    address: "87 T Nagar, Chennai",
    qualification: "MSc Mathematics",
    regNo: "REG20250008",
    cardExpiresAt: new Date("2027-09-26T00:00:00.000Z"),
  },
  {
    name: "Suresh Reddy",
    fatherName: "Mohan Reddy",
    cnic: "35220-1234569-9",
    phone: "03111234569",
    address: "14 Jubilee Hills, Hyderabad",
    qualification: "BA History",
    regNo: "REG20250009",
    cardExpiresAt: new Date("2027-09-26T00:00:00.000Z"),
  },
  {
    name: "Deepak Nair",
    fatherName: "Krishnan Nair",
    cnic: "35220-1234570-0",
    phone: "03111234570",
    address: "25 MG Road, Kochi",
    qualification: "BSc Biology",
    regNo: "REG20250010",
    cardExpiresAt: new Date("2027-09-26T00:00:00.000Z"),
  },
  {
    name: "Ankit Desai",
    fatherName: "Harish Desai",
    cnic: "35220-1234571-1",
    phone: "03111234571",
    address: "33 Ashram Road, Ahmedabad",
    qualification: "BBA",
    regNo: "REG20250011",
    cardExpiresAt: new Date("2027-09-26T00:00:00.000Z"),
  },
  {
    name: "Rahul Kulkarni",
    fatherName: "Madhav Kulkarni",
    cnic: "35220-1234572-2",
    phone: "03111234572",
    address: "22 FC Road, Pune",
    qualification: "MCom",
    regNo: "REG20250012",
    cardExpiresAt: new Date("2027-09-26T00:00:00.000Z"),
  },
  {
    name: "Harsh Vyas",
    fatherName: "Ramesh Vyas",
    cnic: "35220-1234573-3",
    phone: "03111234573",
    address: "19 CG Road, Ahmedabad",
    qualification: "BSc Statistics",
    regNo: "REG20250013",
    cardExpiresAt: new Date("2027-09-26T00:00:00.000Z"),
  },
  {
    name: "Aditya Chauhan",
    fatherName: "Raghav Chauhan",
    cnic: "35220-1234574-4",
    phone: "03111234574",
    address: "9 Civil Lines, Kanpur",
    qualification: "LLB",
    regNo: "REG20250014",
    cardExpiresAt: new Date("2027-09-26T00:00:00.000Z"),
  },
  {
    name: "Manish Bhatia",
    fatherName: "Sanjay Bhatia",
    cnic: "35220-1234575-5",
    phone: "03111234575",
    address: "41 Sector 17, Chandigarh",
    qualification: "BSc Computer Applications",
    regNo: "REG20250015",
    cardExpiresAt: new Date("2027-09-26T00:00:00.000Z"),
  },
  {
    name: "Rajeev Pillai",
    fatherName: "Venugopal Pillai",
    cnic: "35220-1234576-6",
    phone: "03111234576",
    address: "76 Fort Road, Trivandrum",
    qualification: "BA English",
    regNo: "REG20250016",
    cardExpiresAt: new Date("2027-09-26T00:00:00.000Z"),
  },
  {
    name: "Akhil Patil",
    fatherName: "Vishnu Patil",
    cnic: "35220-1234577-7",
    phone: "03111234577",
    address: "18 Shivaji Nagar, Pune",
    qualification: "BSc Geology",
    regNo: "REG20250017",
    cardExpiresAt: new Date("2027-09-26T00:00:00.000Z"),
  },
  {
    name: "Mohit Tiwari",
    fatherName: "Arun Tiwari",
    cnic: "35220-1234578-8",
    phone: "03111234578",
    address: "50 Kankarbagh, Patna",
    qualification: "MA Sociology",
    regNo: "REG20250018",
    cardExpiresAt: new Date("2027-09-26T00:00:00.000Z"),
  },
  {
    name: "Sunil Saxena",
    fatherName: "Devendra Saxena",
    cnic: "35220-1234579-9",
    phone: "03111234579",
    address: "62 Rajendra Nagar, Indore",
    qualification: "BEd",
    regNo: "REG20250019",
    cardExpiresAt: new Date("2027-09-26T00:00:00.000Z"),
  },
  {
    name: "Gaurav Jha",
    fatherName: "Ravindra Jha",
    cnic: "35220-1234580-0",
    phone: "03111234580",
    address: "29 Fraser Road, Patna",
    qualification: "BSc Zoology",
    regNo: "REG20250020",
    cardExpiresAt: new Date("2027-09-26T00:00:00.000Z"),
  },

  // baki 10 bhi isi pattern pe bna leta hu agar chahiye toh
];

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding students...");

  const result = await prisma.member.createMany({
    data: members,
    skipDuplicates: true,
  });

  console.log("Inserted:", result.count);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
