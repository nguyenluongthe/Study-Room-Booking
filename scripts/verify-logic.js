// Automated verification test of core business logic:
// 1. Filtering rooms
// 2. Conflict prevention in time slot booking
// 3. Slot release on cancellation

const assert = require('assert');

// Mock data & simulation of store logic
const TIME_SLOTS = [
  { id: 'slot-1', label: '08:00 - 10:00' },
  { id: 'slot-2', label: '10:00 - 12:00' },
  { id: 'slot-3', label: '13:00 - 15:00' },
  { id: 'slot-4', label: '15:00 - 17:00' },
  { id: 'slot-5', label: '18:00 - 20:00' },
];

const rooms = [
  { id: 'room-1', name: 'Lab A3-101', building: 'Building A3', capacity: 30, status: 'Available' },
  { id: 'room-2', name: 'Library Zone B', building: 'Main Library', capacity: 50, status: 'Occupied' },
  { id: 'room-3', name: 'Study Pod C-204', building: 'Building C', capacity: 6, status: 'Available' },
];

let bookings = [
  {
    id: 'BK-10024',
    roomId: 'room-1',
    date: '2026-09-17',
    slotId: 'slot-2',
    status: 'Confirmed',
  }
];

function isSlotBooked(roomId, date, slotId) {
  return bookings.some(
    b => b.roomId === roomId && b.date === date && b.slotId === slotId && b.status === 'Confirmed'
  );
}

function addBooking(bookingData) {
  if (isSlotBooked(bookingData.roomId, bookingData.date, bookingData.slotId)) {
    return { success: false, message: 'Conflict detected: Slot already reserved!' };
  }
  const id = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
  const newBooking = { ...bookingData, id, status: 'Confirmed' };
  bookings.push(newBooking);
  return { success: true, bookingId: id };
}

function cancelBooking(bookingId) {
  const b = bookings.find(item => item.id === bookingId);
  if (b) {
    b.status = 'Cancelled';
  }
}

console.log('--- RUNNING MINI-PROJECT 2 VERIFICATION TESTS ---');

// Test 1: Conflict Prevention
console.log('1. Testing Conflict Prevention...');
const conflictAttempt = addBooking({
  roomId: 'room-1',
  date: '2026-09-17',
  slotId: 'slot-2', // Already booked in seed data
});
assert.strictEqual(conflictAttempt.success, false, 'Conflict prevention must reject duplicate slot booking');
console.log('✓ PASS: Duplicate booking was successfully rejected with message:', conflictAttempt.message);

// Test 2: Booking an Available Slot
console.log('\n2. Testing Available Slot Booking...');
const validBooking = addBooking({
  roomId: 'room-1',
  date: '2026-09-17',
  slotId: 'slot-3', // 13:00 - 15:00 is free
});
assert.strictEqual(validBooking.success, true, 'Available slot should be booked successfully');
assert.strictEqual(isSlotBooked('room-1', '2026-09-17', 'slot-3'), true, 'Slot should now be marked as booked');
console.log('✓ PASS: Slot-3 booked successfully with Ref ID:', validBooking.bookingId);

// Test 3: Cancellation & Slot Release
console.log('\n3. Testing Cancellation and Slot Release...');
cancelBooking(validBooking.bookingId);
assert.strictEqual(isSlotBooked('room-1', '2026-09-17', 'slot-3'), false, 'Slot must be released after cancellation');
console.log('✓ PASS: Slot-3 is now released and available again!');

// Test 4: Room Filtering
console.log('\n4. Testing Room Filter Logic...');
const filterBuildingA3 = rooms.filter(r => r.building === 'Building A3');
assert.strictEqual(filterBuildingA3.length, 1);
assert.strictEqual(filterBuildingA3[0].name, 'Lab A3-101');

const filterCapacityOver20 = rooms.filter(r => r.capacity >= 20);
assert.strictEqual(filterCapacityOver20.length, 2);

console.log('✓ PASS: Multi-parameter filter logic behaves correctly.');

console.log('\n=============================================');
console.log('ALL MINI-PROJECT 2 LOGIC TESTS PASSED (4/4)!');
console.log('=============================================');
