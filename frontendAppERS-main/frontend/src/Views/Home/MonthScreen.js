import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, Modal, ScrollView, Alert } from 'react-native';
import moment from 'moment';
import styles from './styles';
import { url1234 } from './Url123';  // Import the base URL

export default function MonthScreen() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedButton, setSelectedButton] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  useEffect(() => {
      fetch(`${url1234}/dayscreen`)
          .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
      })
      .catch((error) => console.error('Error fetching employees:', error));
  }, []);

  const selectEmployee = (employee) => {
    setSelectedEmployee(employee);
    setModalVisible(false);
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => prev.clone().subtract(1, 'months'));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => prev.clone().add(1, 'months'));
  };

  const handleButtonPress = (buttonTitle) => {
    setSelectedButton(buttonTitle);
  };

  const handleDayPress = (day) => {
    if (selectedButton && selectedEmployee) {
      setSelectedDay(day);
      setConfirmModalVisible(true);
    }
  };

  const updateAttendance = async () => {
    const formattedDate = selectedDay.format('YYYY-MM-DD');
    console.log(`Updating attendance for date: ${formattedDate} with status: ${selectedButton}`); // Add this line

    try {
      const response = await fetch('https://backendappers.onrender.com/updateAttendance', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employee_id: selectedEmployee.id,
          date: formattedDate,
          status: selectedButton,
          color: selectedButton === 'Đủ' ? 'green' : selectedButton === 'Vắng' ? 'red' : selectedButton === 'Nửa' ? 'yellow' : 'transparent',
        }),
      });

      // Check if response is OK (status code 200)
      if (response.ok) {
        const updatedAttendance = [...selectedEmployee.attendance];
        const attendanceIndex = updatedAttendance.findIndex((att) => att.date === formattedDate);

        if (attendanceIndex > -1) {
          if (selectedButton === 'Xóa') {
            updatedAttendance.splice(attendanceIndex, 1);
          } else {
            updatedAttendance[attendanceIndex] = {
              ...updatedAttendance[attendanceIndex],
              status: selectedButton,
              color: selectedButton === 'Đủ' ? 'green' : selectedButton === 'Vắng' ? 'red' : selectedButton === 'Nửa' ? 'yellow' : 'transparent',
            };
          }
        } else {
          updatedAttendance.push({
            date: formattedDate,
            status: selectedButton,
            color: selectedButton === 'Đủ' ? 'green' : selectedButton === 'Vắng' ? 'red' : selectedButton === 'Nửa' ? 'yellow' : 'transparent',
          });
        }

        const updatedEmployee = { ...selectedEmployee, attendance: updatedAttendance };

        // Assuming setSelectedEmployee and setEmployees are state setters
        setSelectedEmployee(updatedEmployee);

        const employeeIndex = employees.findIndex((emp) => emp.id === selectedEmployee.id);
        const updatedEmployees = [...employees];
        updatedEmployees[employeeIndex] = updatedEmployee;

        // Assuming setEmployees is a state setter
        setEmployees(updatedEmployees);

        setConfirmModalVisible(false); // Close modal after successful update
      } else {
        console.error(`Failed to update attendance. Server responded with ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

  const renderDays = () => {
    const startOfMonth = currentMonth.clone().startOf('month').startOf('week');
    const endOfMonth = currentMonth.clone().endOf('month').endOf('week');
    const days = [];

    let day = startOfMonth.clone().subtract(0, 'day');

    while (day.isBefore(endOfMonth, 'day')) {
      day = day.add(1, 'day');
      const dayClone = day.clone();
      const isCurrentMonth = day.month() === currentMonth.month();

      const attendance = selectedEmployee?.attendance.find(
        (att) => att.date === dayClone.format('YYYY-MM-DD')
      );

      const dayStyle = {
        ...styles.dayCell,
        backgroundColor: attendance ? attendance.color : 'transparent',
        opacity: isCurrentMonth ? 1 : 0.3,
      };

      days.push(
        <TouchableOpacity key={dayClone.format('DD-MM-YYYY')} style={dayStyle} onPress={() => handleDayPress(dayClone)}>
          <Text style={styles.dayText}>{dayClone.date()}</Text>
        </TouchableOpacity>
      );
    }

    return days;
  };

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Text style={styles.navButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.monthYear}>{currentMonth.format('MM/YYYY')}</Text>
        <TouchableOpacity onPress={handleNextMonth}>
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
      <View style={styles.buttons}>
        <Button
          title="Đủ"
          onPress={() => handleButtonPress('Đủ')}
          color={selectedButton === 'Đủ' ? 'green' : undefined}
        />
        <Button
          title="Vắng"
          onPress={() => handleButtonPress('Vắng')}
          color={selectedButton === 'Vắng' ? 'red' : undefined}
        />
        <Button
          title="Nửa"
          onPress={() => handleButtonPress('Nửa')}
          color={selectedButton === 'Nửa' ? 'yellow' : undefined}
        />
        <Button
          title="Xóa"
          onPress={() => handleButtonPress('Xóa')}
          color={selectedButton === 'Xóa' ? 'black' : undefined}
        />
      </View>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.openModalButton}>
        <Text style={styles.openModalButtonText}>Nhân viên: {selectedEmployee ? selectedEmployee.name : 'Chọn nhân viên'}</Text>
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              {employees.map((employee) => (
                <TouchableOpacity
                  key={employee.id}
                  onPress={() => selectEmployee(employee)}
                  style={[
                    styles.employeeButton,
                    selectedEmployee?.id === employee.id && styles.selectedEmployeeButton
                  ]}
                >
                  <Text>{employee.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
      <Modal
        visible={confirmModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setConfirmModalVisible(false)}
      >
        <View style={styles.confirmModalContainer}>
          <View style={styles.confirmModalContent}>
            <Text style={styles.confirmModalTitle}>Cập nhật trạng thái</Text>
            <Text style={styles.confirmModalMessage}>{`Bạn có chắc muốn cập nhật trạng thái của nhân viên ${selectedEmployee?.name} trong ngày ${selectedDay?.format('DD-MM-YYYY')} thành ${selectedButton}?`}</Text>
            <View style={styles.confirmModalButtons}>
              <TouchableOpacity style={styles.confirmButton} onPress={updateAttendance}>
                <Text style={styles.confirmButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={() => setConfirmModalVisible(false)}>
                <Text style={styles.confirmButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
