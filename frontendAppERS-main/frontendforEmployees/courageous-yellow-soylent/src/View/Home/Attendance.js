import React, { useState, useEffect } from 'react';
import { View, Text, Animated, Switch } from 'react-native';
import { SlideToCheckIn, SlideToCheckOut } from './SwipeButton'; // Import SlideToCheckOut
import styles from './styleattendance';
import TypewriterText from './Animation/TypewriterText';

const Attendance = () => {
  const [checkedIn, setCheckedIn] = useState(false);
  const [fadeInOut] = useState(new Animated.Value(0));
  const [showWelcomeText, setShowWelcomeText] = useState(false);
  const [showEmployeeId, setShowEmployeeId] = useState(false);
  const [showWorkDays, setShowWorkDays] = useState(false);
  const [workDays, setWorkDays] = useState(36); // Example value for work days
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null); // State for checkout time
  const [isEnabled, setIsEnabled] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false); // State for showing SlideToCheckOut

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowWelcomeText(true);
    }, 1000);

    return () => clearTimeout(timer1);
  }, []);

  useEffect(() => {
    if (showWelcomeText) {
      const timer2 = setTimeout(() => {
        setShowEmployeeId(true);
      }, 2000);

      return () => clearTimeout(timer2);
    }
  }, [showWelcomeText]);

  useEffect(() => {
    if (showEmployeeId) {
      animateContainers();
    }
  }, [showEmployeeId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const animateContainers = () => {
    Animated.timing(fadeInOut, {
      toValue: 1,
      duration: 4100,
      useNativeDriver: true,
    }).start();
  };

  const handleCheckIn = () => {
    console.log("Checked In");

    const checkInAt = new Date();
    setCheckInTime(checkInAt);

    Animated.timing(fadeInOut, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setCheckedIn(true);
      setShowWorkDays(true);
      setShowCheckOut(false); // Reset showCheckOut state when checking in
      fadeInOut.setValue(1);
    });
  };

  const handleCheckout = () => {
    console.log("Checked Out");

    const checkOutAt = new Date();
    setCheckOutTime(checkOutAt); // Set checkout time

    setCheckedIn(false);
    setShowCheckOut(false);

    Animated.timing(fadeInOut, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      fadeInOut.setValue(1);
    });
  };

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    setShowCheckOut(previousState => !previousState); // Toggle showCheckOut state
  };

  const formatDateTime = (date) => {
    const options = {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        {showWelcomeText && (
          <TypewriterText text="Welcome," speed={100} style={styles.welcomeText} />
        )}
        {showEmployeeId && (
          <TypewriterText text="Employee A123456" speed={50} style={styles.employeeId} />
        )}
      </View>

      {/* Status Section */}
      <Animated.View style={[styles.statusContainer, { opacity: fadeInOut }]}>
        <Text style={styles.statusTitle}>Today's Status</Text>
        <View style={styles.timeContainer}>
          {/* Check In Time */}
          <Animated.View style={[styles.checkInOutContainer, { opacity: fadeInOut }]}>
            <Text style={styles.timeTitle}>Check In</Text>
            <Text style={styles.time}>
              {checkInTime ? formatDateTime(checkInTime).split(', ')[1] : '--/--'}
            </Text>
          </Animated.View>

          {/* Check Out Time (if available) */}
          {checkOutTime && (
            <Animated.View style={[styles.checkInOutContainer, { opacity: fadeInOut }]}>
              <Text style={styles.timeTitle}>Check Out</Text>
              <Text style={styles.time}>
                {formatDateTime(checkOutTime).split(', ')[1]}
              </Text>
            </Animated.View>
          )}
        </View>
      </Animated.View>

      {/* Date Section */}
      <Animated.View style={[styles.dateContainer, { opacity: fadeInOut }]}>
        <Text style={styles.date}>{formatDateTime(currentDateTime).split(', ')[0]}</Text>
        <Text style={styles.timeText}>{formatDateTime(currentDateTime).split(', ')[1]}</Text>
      </Animated.View>

      {/* Checkout Section */}
      {checkedIn && !checkOutTime && (
        <View style={styles.wrapper}>
          <Text style={styles.content}>Checkout</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      )}

      {/* Work Days Section */}
      {showWorkDays && (
        <View style={styles.workDaysContainer}>
          <Text style={styles.boldText}>
            Số ngày công bạn đã làm được trong tháng này :
          </Text>
          <Text style={[styles.largeRedText, styles.centerText]}>
            {"\n"}
            {workDays}
          </Text>
        </View>
      )}

      {/* SlideToCheckOut Section */}
      {showCheckOut && checkedIn && !checkOutTime && (
        <View style={styles.checkInButtonContainer}>
          <SlideToCheckOut onSwipeSuccess={handleCheckout} />
        </View>
      )}

      {/* SlideToCheckIn Section */}
      {!checkedIn && !checkOutTime && (
        <View style={styles.checkInButtonContainer}>
          <SlideToCheckIn onSwipeSuccess={handleCheckIn} />
        </View>
      )}
    </View>
  );
};

export default Attendance;
