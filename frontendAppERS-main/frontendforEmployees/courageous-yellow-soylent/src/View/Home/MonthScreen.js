import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
import styles from './styles';
import { url1234 } from './Url123';  // Import the base URL

const attendance = [
  { "date": "2024-06-01", "status": "đủ" },
  { "date": "2024-06-02", "status": "vắng" },
  { "date": "2024-06-03", "status": "đủ" },
  { "date": "2024-06-04", "status": "vắng" },
  { "date": "2024-06-05", "status": "đủ" },
  { "date": "2024-06-06", "status": "vắng" },
  { "date": "2024-06-07", "status": "đủ" },
  { "date": "2024-06-08", "status": "vắng" },
  { "date": "2024-06-09", "status": "đủ" },
  { "date": "2024-06-10", "status": "vắng" },
  { "date": "2024-06-11", "status": "đủ" },
  { "date": "2024-06-12", "status": "vắng" },
  { "date": "2024-06-13", "status": "đủ" },
  { "date": "2024-06-14", "status": "vắng" },
  { "date": "2024-06-15", "status": "đủ" },
  { "date": "2024-06-16", "status": "vắng" },
  { "date": "2024-06-17", "status": "đủ" },
  { "date": "2024-06-18", "status": "vắng" },
  { "date": "2024-06-19", "status": "đủ" },
  { "date": "2024-06-20", "status": "vắng" },
  { "date": "2024-06-21", "status": "đủ" },
  { "date": "2024-06-22", "status": "vắng" },
  { "date": "2024-06-23", "status": "đủ" },
  { "date": "2024-06-24", "status": "vắng" },
  { "date": "2024-06-25", "status": "đủ" },
  { "date": "2024-06-26", "status": "vắng" },
  { "date": "2024-06-27", "status": "đủ" },
  { "date": "2024-06-28", "status": "vắng" },
  { "date": "2024-06-29", "status": "đủ" },
  { "date": "2024-06-30", "status": "vắng" }
];

const advances = [
  {
    "id": 1,
    "employee_id": 101,
    "advance_date": "2024-06-01",
    "amount": 1000.00,
    "description": "Advance payment for project materials"
  },
  {
    "id": 2,
    "employee_id": 101,
    "advance_date": "2024-06-05",
    "amount": 1500.50,
    "description": "Emergency medical advance"
  },
  {
    "id": 3,
    "employee_id": 101,
    "advance_date": "2024-06-08",
    "amount": 750.75,
    "description": "Travel expense advance"
  },
  {
    "id": 4,
    "employee_id": 101,
    "advance_date": "2024-06-10",
    "amount": 2000.00,
    "description": "Advance for client meeting expenses"
  },
  {
    "id": 5,
    "employee_id": 101,
    "advance_date": "2024-06-12",
    "amount": 1250.00,
    "description": "Advance for software purchase"
  },
  {
    "id": 6,
    "employee_id": 101,
    "advance_date": "2024-06-15",
    "amount": 900.00,
    "description": "Office supplies advance"
  },
  {
    "id": 7,
    "employee_id": 101,
    "advance_date": "2024-06-18",
    "amount": 1750.00,
    "description": "Advance for training program"
  },
  {
    "id": 8,
    "employee_id": 101,
    "advance_date": "2024-06-20",
    "amount": 1100.00,
    "description": "Advance for equipment repair"
  },
  {
    "id": 9,
    "employee_id": 101,
    "advance_date": "2024-06-25",
    "amount": 1400.00,
    "description": "Advance for client hospitality"
  },
  {
    "id": 10,
    "employee_id": 101,
    "advance_date": "2024-06-28",
    "amount": 1600.00,
    "description": "Advance for marketing campaign"
  }
];

export default function MonthScreen() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(moment());

  const [workdays, setWorkdays] = useState(20); // Giá trị mặc định cho số ngày công
  const [advancePayments, setAdvancePayments] = useState(1000); // Giá trị mặc định cho số tiền ứng

  useEffect(() => {
    fetch(`${url1234}/dayscreen`)
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
      })
      .catch((error) => console.error('Error fetching employees:', error));
  }, []);

  useEffect(() => {
    // Cập nhật số ngày công và số tiền ứng mỗi khi tháng hiện tại thay đổi
    setWorkdays(calculateWorkdays());
    setAdvancePayments(calculateAdvancePayments());
  }, [currentMonth]);

  const renderDays = () => {
    const startOfMonth = currentMonth.clone().startOf('month').startOf('week');
    const endOfMonth = currentMonth.clone().endOf('month').endOf('week');
    const days = [];

    let day = startOfMonth.clone().subtract(0, 'day');

    while (day.isBefore(endOfMonth, 'day')) {
      day = day.add(1, 'day');
      const dayClone = day.clone();
      const isCurrentMonth = day.month() === currentMonth.month();

      const attendanceForDay = attendance.find(
        (att) => att.date === dayClone.format('YYYY-MM-DD')
      );

      const advanceForDay = advances.find(
        (adv) => adv.advance_date === dayClone.format('YYYY-MM-DD')
      );

      const dayStyle = {
        ...styles.dayCell,
        backgroundColor: attendanceForDay
          ? attendanceForDay.status === 'đủ'
            ? 'green'
            : 'red'
          : 'transparent',
        opacity: isCurrentMonth ? 1 : 0.3,
      };

      days.push(
        <View key={dayClone.format('DD-MM-YYYY')} style={dayStyle}>
          <Text style={styles.dayText}>{dayClone.date()}</Text>
          {advanceForDay && (
            <Text style={styles.advanceText}>UT</Text>
          )}
        </View>
      );
    }

    return days;
  };

  const calculateWorkdays = () => {
    return attendance.filter(
      (att) => att.status === 'đủ' && moment(att.date).month() === currentMonth.month()
    ).length;
  };

  const calculateAdvancePayments = () => {
    const totalAdvance = advances.reduce((acc, advance) => {
      if (moment(advance.advance_date).month() === currentMonth.month()) {
        return acc + advance.amount;
      }
      return acc;
    }, 0);

    return totalAdvance;
  };

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.headerss}>
        <TouchableOpacity onPress={() => setCurrentMonth((prev) => prev.clone().subtract(1, 'months'))}>
          <Text style={styles.navButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.monthYear}>{currentMonth.format('MM/YYYY')}</Text>
        <TouchableOpacity onPress={() => setCurrentMonth((prev) => prev.clone().add(1, 'months'))}>
          <Text style={styles.navButton}>{'>'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.weekdays}>
        {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day, index) => (
          <Text key={index} style={styles.weekday}>{day}</Text>
        ))}
      </View>
      <View style={styles.calendar}>
        {renderDays()}
      </View>
      <View style={styles.additionalInfo}>
        <Text style={styles.additionalInfoText}>
          Số ngày công: {workdays} ngày
        </Text>
        <Text style={styles.additionalInfoText}>
          Số tiền ứng: {advancePayments} VNĐ
        </Text>
      </View>
    </View>
  );
}
