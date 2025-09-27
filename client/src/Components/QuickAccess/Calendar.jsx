import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt } from 'react-icons/fa';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  // const [view, setView] = useState('month');

  // Mock data - replace with actual API data
  const events = [
    { date: '2024-02-15', type: 'Annual Leave', status: 'Approved', employee: 'John Doe' },
    { date: '2024-02-16', type: 'Team Meeting', status: 'Scheduled', employee: 'All Team' },
    { date: '2024-02-20', type: 'Sick Leave', status: 'Pending', employee: 'Jane Smith' }
  ];

  const generateCalendarDays = () => {
    const days = [];
    const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const lastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    
    // Get the starting day of the week (0 = Sunday, 1 = Monday, etc.)
    const startingDayOfWeek = firstDay.getDay();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthLastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0);
      const day = new Date(prevMonthLastDay.setDate(prevMonthLastDay.getDate() - (startingDayOfWeek - i - 1)));
      days.push({ date: day, isCurrentMonth: false });
    }

    // Add days of the current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({
        date: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i),
        isCurrentMonth: true
      });
    }

    // Add empty cells for days after the last day of the month
    const remainingDays = 42 - days.length; // 42 = 6 rows × 7 days
    for (let i = 1; i <= remainingDays; i++) {
      const nextMonthDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, i);
      days.push({ date: nextMonthDay, isCurrentMonth: false });
    }

    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setSelectedDate(newDate);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const hasEvent = (date) => {
    return events.some(event => new Date(event.date).toDateString() === date.toDateString());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex flex-col md:flex-row gap-8">
          {/* Calendar Section */}
          <div className="flex-grow">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setSelectedDate(new Date())}
                    className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => navigateMonth(1)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white"
                  >
                    →
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-gray-400 text-sm py-2">
                    {day}
                  </div>
                ))}
                {generateCalendarDays().map((dayObj, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className={`
                      p-2 rounded-lg text-center cursor-pointer relative
                      ${dayObj.isCurrentMonth 
                        ? isToday(dayObj.date)
                          ? 'bg-blue-500 text-white'
                          : 'bg-white/5 text-white hover:bg-white/10'
                        : 'bg-white/5 text-gray-500 hover:bg-white/10'
                      }
                    `}
                    onClick={() => setSelectedDate(dayObj.date)}
                  >
                    <span>{dayObj.date.getDate()}</span>
                    {hasEvent(dayObj.date) && (
                      <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full"></span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Events Section */}
          <div className="md:w-96">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Events for {selectedDate.toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })}
              </h3>
              <div className="space-y-4">
                {events
                  .filter(event => new Date(event.date).toDateString() === selectedDate.toDateString())
                  .map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 rounded-lg p-4"
                    >
                      <div className="flex items-center gap-3">
                        <FaCalendarAlt className="text-blue-400" />
                        <div>
                          <p className="text-white font-medium">{event.type}</p>
                          <p className="text-sm text-gray-300">{event.employee}</p>
                        </div>
                        <span className={`ml-auto text-sm ${
                          event.status === 'Approved' ? 'text-green-400' :
                          event.status === 'Pending' ? 'text-yellow-400' : 'text-blue-400'
                        }`}>
                          {event.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                {events.filter(event => new Date(event.date).toDateString() === selectedDate.toDateString()).length === 0 && (
                  <p className="text-gray-400 text-center py-4">No events for this date</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Calendar;
