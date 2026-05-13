export const COLORS = {
  ink: '#0f172a',
  inkLight: '#1e293b',
  gold: '#c89c4a',
  goldLight: '#f59e0b',
  ivory: '#fafaf9',
  stone: '#f5f5f4',
  border: '#e7e5e4',
  text: '#1c1917',
  textMuted: '#78716c',
  textLight: '#a8a29e',
  emerald: '#10b981',
  rose: '#f43f5e',
  indigo: '#6366f1',
  amber: '#f59e0b',
  white: '#ffffff',
};

export const ROLES = {
  student: { name: 'Aarav Mehta', sub: 'Grade 9 — Section A', id: 'STU2026-0341', avatar: 'AM', color: '#c89c4a' },
  teacher: { name: 'Ms. Priya Sharma', sub: 'Mathematics · Grade 8–10', id: 'FAC-0087', avatar: 'PS', color: '#10b981' },
  head: { name: 'Dr. Rajeev Iyer', sub: 'Principal · Academic Head', id: 'ADM-001', avatar: 'RI', color: '#f43f5e' },
  parent: { name: 'Mrs. Anjali Mehta', sub: 'Parent of Aarav (Grade 9A)', id: 'PAR-2341', avatar: 'AN', color: '#6366f1' },
  driver: { name: 'Mr. Ramesh Kumar', sub: 'Bus B-01 · Indiranagar Route', id: 'DRV-001', avatar: 'RK', color: '#0ea5e9' },
};

export const TIMETABLE = {
  Monday: [
    { time: '08:00', subject: 'Mathematics', teacher: 'Ms. Sharma', room: '204', color: '#fef3c7', icon: 'calculator' },
    { time: '09:00', subject: 'English', teacher: 'Mr. Kapoor', room: '108', color: '#fee2e2', icon: 'book-open' },
    { time: '10:00', subject: 'Science', teacher: 'Dr. Reddy', room: 'Lab-2', color: '#d1fae5', icon: 'flask' },
    { time: '11:15', subject: 'Hindi', teacher: 'Mrs. Verma', room: '210', color: '#ffedd5', icon: 'book' },
    { time: '12:15', subject: 'Lunch Break', teacher: '', room: 'Cafeteria', color: '#f5f5f4', icon: 'coffee' },
    { time: '13:00', subject: 'Social Studies', teacher: 'Mr. Singh', room: '305', color: '#e0f2fe', icon: 'globe-alt' },
    { time: '14:00', subject: 'Computer Sc.', teacher: 'Mr. Nair', room: 'Lab-1', color: '#ede9fe', icon: 'computer-desktop' },
    { time: '15:00', subject: 'Sports', teacher: 'Coach Khan', room: 'Field', color: '#f0fdf4', icon: 'trophy' },
  ],
  Tuesday: [
    { time: '08:00', subject: 'Science', teacher: 'Dr. Reddy', room: 'Lab-2', color: '#d1fae5', icon: 'flask' },
    { time: '09:00', subject: 'Mathematics', teacher: 'Ms. Sharma', room: '204', color: '#fef3c7', icon: 'calculator' },
    { time: '10:00', subject: 'Art', teacher: 'Mrs. Das', room: 'Studio', color: '#fce7f3', icon: 'paint-brush' },
    { time: '11:15', subject: 'English', teacher: 'Mr. Kapoor', room: '108', color: '#fee2e2', icon: 'book-open' },
    { time: '12:15', subject: 'Lunch Break', teacher: '', room: 'Cafeteria', color: '#f5f5f4', icon: 'coffee' },
    { time: '13:00', subject: 'Hindi', teacher: 'Mrs. Verma', room: '210', color: '#ffedd5', icon: 'book' },
    { time: '14:00', subject: 'Mathematics', teacher: 'Ms. Sharma', room: '204', color: '#fef3c7', icon: 'calculator' },
    { time: '15:00', subject: 'Library', teacher: 'Mrs. Pillai', room: 'Library', color: '#f5f5f4', icon: 'book-open' },
  ],
  Wednesday: [
    { time: '08:00', subject: 'English', teacher: 'Mr. Kapoor', room: '108', color: '#fee2e2', icon: 'book-open' },
    { time: '09:00', subject: 'Social Studies', teacher: 'Mr. Singh', room: '305', color: '#e0f2fe', icon: 'globe-alt' },
    { time: '10:00', subject: 'Science', teacher: 'Dr. Reddy', room: 'Lab-2', color: '#d1fae5', icon: 'flask' },
    { time: '11:15', subject: 'Mathematics', teacher: 'Ms. Sharma', room: '204', color: '#fef3c7', icon: 'calculator' },
    { time: '12:15', subject: 'Lunch Break', teacher: '', room: 'Cafeteria', color: '#f5f5f4', icon: 'coffee' },
    { time: '13:00', subject: 'Computer Sc.', teacher: 'Mr. Nair', room: 'Lab-1', color: '#ede9fe', icon: 'computer-desktop' },
    { time: '14:00', subject: 'Music', teacher: 'Mr. Joshi', room: 'Music Rm', color: '#e0e7ff', icon: 'musical-note' },
    { time: '15:00', subject: 'Sports', teacher: 'Coach Khan', room: 'Field', color: '#f0fdf4', icon: 'trophy' },
  ],
  Thursday: [
    { time: '08:00', subject: 'Mathematics', teacher: 'Ms. Sharma', room: '204', color: '#fef3c7', icon: 'calculator' },
    { time: '09:00', subject: 'Hindi', teacher: 'Mrs. Verma', room: '210', color: '#ffedd5', icon: 'book' },
    { time: '10:00', subject: 'English', teacher: 'Mr. Kapoor', room: '108', color: '#fee2e2', icon: 'book-open' },
    { time: '11:15', subject: 'Science', teacher: 'Dr. Reddy', room: 'Lab-2', color: '#d1fae5', icon: 'flask' },
    { time: '12:15', subject: 'Lunch Break', teacher: '', room: 'Cafeteria', color: '#f5f5f4', icon: 'coffee' },
    { time: '13:00', subject: 'Social Studies', teacher: 'Mr. Singh', room: '305', color: '#e0f2fe', icon: 'globe-alt' },
    { time: '14:00', subject: 'Art', teacher: 'Mrs. Das', room: 'Studio', color: '#fce7f3', icon: 'paint-brush' },
    { time: '15:00', subject: 'Mathematics', teacher: 'Ms. Sharma', room: '204', color: '#fef3c7', icon: 'calculator' },
  ],
  Friday: [
    { time: '08:00', subject: 'Science', teacher: 'Dr. Reddy', room: 'Lab-2', color: '#d1fae5', icon: 'flask' },
    { time: '09:00', subject: 'Mathematics', teacher: 'Ms. Sharma', room: '204', color: '#fef3c7', icon: 'calculator' },
    { time: '10:00', subject: 'English', teacher: 'Mr. Kapoor', room: '108', color: '#fee2e2', icon: 'book-open' },
    { time: '11:15', subject: 'Computer Sc.', teacher: 'Mr. Nair', room: 'Lab-1', color: '#ede9fe', icon: 'computer-desktop' },
    { time: '12:15', subject: 'Lunch Break', teacher: '', room: 'Cafeteria', color: '#f5f5f4', icon: 'coffee' },
    { time: '13:00', subject: 'Assembly', teacher: 'All', room: 'Hall', color: '#fef3c7', icon: 'megaphone' },
    { time: '14:00', subject: 'Sports', teacher: 'Coach Khan', room: 'Field', color: '#f0fdf4', icon: 'trophy' },
    { time: '15:00', subject: 'Free Period', teacher: '', room: 'Class', color: '#f5f5f4', icon: 'clock' },
  ],
};

export const HOMEWORK = [
  { id: 1, subject: 'Mathematics', title: 'Chapter 7 — Quadratic Equations (Q. 1–15)', due: 'Tomorrow', status: 'pending', teacher: 'Ms. Sharma', priority: 'high' },
  { id: 2, subject: 'English', title: 'Essay: "The role of literature in modern life" (500 words)', due: 'Friday', status: 'pending', teacher: 'Mr. Kapoor', priority: 'medium' },
  { id: 3, subject: 'Science', title: 'Lab report: Acids, Bases & Salts experiment', due: 'Mon, May 18', status: 'submitted', teacher: 'Dr. Reddy', priority: 'medium' },
  { id: 4, subject: 'Social Studies', title: 'Map work: French Revolution sites', due: 'Wed, May 20', status: 'pending', teacher: 'Mr. Singh', priority: 'low' },
  { id: 5, subject: 'Hindi', title: 'अनुच्छेद लेखन — विद्यार्थी जीवन', due: 'Today', status: 'pending', teacher: 'Mrs. Verma', priority: 'high' },
  { id: 6, subject: 'Computer Sc.', title: 'Build a simple calculator using Python', due: 'Fri, May 22', status: 'pending', teacher: 'Mr. Nair', priority: 'medium' },
];

export const ANNOUNCEMENTS = [
  { id: 1, title: 'Annual Sports Day — Registration Open', body: 'Students may register for events with their PE teacher by 18th May. Categories include athletics, basketball, badminton, and chess.', author: 'Sports Department', date: 'May 12, 2026', type: 'event', urgent: false },
  { id: 2, title: 'Mid-term Examinations Schedule Released', body: 'The mid-term examinations will commence on the 28th of May. Detailed schedule and seating plans are available in the academics portal.', author: 'Examination Cell', date: 'May 11, 2026', type: 'academic', urgent: true },
  { id: 3, title: 'Parent-Teacher Meeting — Grade 9', body: 'PTM for Grade 9 parents is scheduled on Saturday, 16th May, from 9:00 AM to 1:00 PM. Please book your slot via the parent portal.', author: "Principal's Office", date: 'May 10, 2026', type: 'meeting', urgent: false },
  { id: 4, title: 'School Library New Arrivals — May 2026', body: 'Over 200 new titles have been added across fiction, biography, science, and reference. Reserve copies online before Friday.', author: 'Library', date: 'May 9, 2026', type: 'info', urgent: false },
  { id: 5, title: 'Bus Route No. 7 — Temporary Diversion', body: 'Due to roadworks on MG Road, Bus 7 will follow an alternate route via Brigade Road from 13–20 May. Pickup times may shift by 5–7 minutes.', author: 'Transport', date: 'May 8, 2026', type: 'transport', urgent: true },
];

export const BUS_ROUTES = [
  { id: 'B-01', route: 'Indiranagar — Koramangala', driver: 'Mr. Ramesh', students: 32, status: 'on-route', eta: '7:42 AM', currentStop: 'Domlur Junction', nextStop: 'School Gate' },
  { id: 'B-02', route: 'Whitefield — Marathahalli', driver: 'Mr. Anand', students: 28, status: 'arrived', eta: 'Arrived', currentStop: 'School Gate', nextStop: '—' },
  { id: 'B-03', route: 'HSR Layout — BTM', driver: 'Mr. Manoj', students: 30, status: 'on-route', eta: '7:48 AM', currentStop: 'Silk Board', nextStop: 'Madiwala' },
  { id: 'B-04', route: 'JP Nagar — Jayanagar', driver: 'Mr. Krishna', students: 26, status: 'delayed', eta: '7:55 AM (+10)', currentStop: 'Banashankari', nextStop: 'Jayanagar 4th Block' },
  { id: 'B-05', route: 'Hebbal — Yelahanka', driver: 'Mr. Prakash', students: 34, status: 'on-route', eta: '7:51 AM', currentStop: 'Hebbal Flyover', nextStop: 'Mekhri Circle' },
  { id: 'B-07', route: 'MG Road — Brigade Rd.', driver: 'Mr. Joseph', students: 22, status: 'diversion', eta: '7:58 AM (+5)', currentStop: 'Cubbon Park', nextStop: 'Trinity Circle' },
];

export const EXAM_RESULTS = [
  { subject: 'Mathematics', score: 92, total: 100, grade: 'A+', rank: 3 },
  { subject: 'Science', score: 88, total: 100, grade: 'A', rank: 7 },
  { subject: 'English', score: 85, total: 100, grade: 'A', rank: 12 },
  { subject: 'Social Studies', score: 79, total: 100, grade: 'B+', rank: 18 },
  { subject: 'Hindi', score: 90, total: 100, grade: 'A+', rank: 5 },
  { subject: 'Computer Sc.', score: 95, total: 100, grade: 'A+', rank: 2 },
];

export const FEES_DATA = [
  { term: 'Term 1 (Apr–Jun)', amount: 42000, status: 'paid', dueDate: 'Apr 15, 2026', paidOn: 'Apr 8, 2026' },
  { term: 'Term 2 (Jul–Sep)', amount: 42000, status: 'paid', dueDate: 'Jul 15, 2026', paidOn: 'Jul 12, 2026' },
  { term: 'Term 3 (Oct–Dec)', amount: 42000, status: 'pending', dueDate: 'May 30, 2026', paidOn: '—' },
  { term: 'Activity & Transport', amount: 18000, status: 'pending', dueDate: 'May 30, 2026', paidOn: '—' },
];

export const TEACHERS_LIST = [
  { name: 'Ms. Priya Sharma', subject: 'Mathematics', classes: 5, experience: '12 yrs', rating: 4.8 },
  { name: 'Dr. Sandeep Reddy', subject: 'Science', classes: 4, experience: '15 yrs', rating: 4.9 },
  { name: 'Mr. Arjun Kapoor', subject: 'English', classes: 6, experience: '8 yrs', rating: 4.7 },
  { name: 'Mrs. Sunita Verma', subject: 'Hindi', classes: 5, experience: '20 yrs', rating: 4.6 },
  { name: 'Mr. Vikram Singh', subject: 'Social Studies', classes: 4, experience: '10 yrs', rating: 4.5 },
  { name: 'Mr. Rohit Nair', subject: 'Computer Science', classes: 3, experience: '6 yrs', rating: 4.8 },
];

export const GALLERY_ALBUMS = [
  { id: 1, title: 'Annual Day 2026', count: 142, date: 'Apr 30, 2026', color1: '#c89c4a', color2: '#8b5e1f' },
  { id: 2, title: 'Science Exhibition', count: 87, date: 'Apr 18, 2026', color1: '#5d8a66', color2: '#2d4a35' },
  { id: 3, title: 'Sports Meet', count: 215, date: 'Apr 12, 2026', color1: '#b85450', color2: '#6b2a28' },
  { id: 4, title: 'Cultural Fest', count: 168, date: 'Mar 28, 2026', color1: '#4a6b8a', color2: '#1f3a5f' },
  { id: 5, title: 'Republic Day', count: 64, date: 'Jan 26, 2026', color1: '#d4a574', color2: '#8b6b3d' },
  { id: 6, title: 'Trekking — Coorg', count: 98, date: 'Jan 15, 2026', color1: '#6b8e5a', color2: '#3a5234' },
];

export const EVENTS = [
  { date: 14, day: 'Wed', title: 'Inter-school debate', type: 'competition', time: '2:00 PM' },
  { date: 16, day: 'Fri', title: 'Parent-Teacher Meeting', type: 'meeting', time: '9:00 AM' },
  { date: 18, day: 'Sun', title: 'Sports Day deadline', type: 'deadline', time: 'EOD' },
  { date: 22, day: 'Thu', title: 'Annual Science Fair', type: 'event', time: '10:00 AM' },
  { date: 28, day: 'Wed', title: 'Mid-term Exams begin', type: 'exam', time: '8:00 AM' },
];

export const PERFORMANCE_DATA = {
  labels: ['Math', 'Science', 'English', 'Social', 'Hindi', 'Comp Sc.'],
  datasets: [{ data: [92, 88, 85, 79, 90, 95] }],
};

export const ATTENDANCE_DATA = {
  labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  datasets: [{ data: [22, 20, 23, 21, 22, 19] }],
};
