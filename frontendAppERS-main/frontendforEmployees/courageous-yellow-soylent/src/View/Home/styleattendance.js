// styles.js

import { StyleSheet, Dimensions } from 'react-native';
import { Platform } from 'react-native';

const { width } = Dimensions.get('window');
const BUTTON_WIDTH = width - 100;
const BUTTON_HEIGHT = 80;
const SWIPEABLE_DIMENSIONS = 69;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    position: 'relative',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  employeeId: {
    fontSize: 16,
    color: '#888',
  },
  statusContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  statusTitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: Platform.OS === 'ios' ? 20 : 10,
  },
  checkInOutContainer: {
    alignItems: 'center',
    width: '45%',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: Platform.OS === 'ios' ? 10 : 20,
  },
  timeTitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
    fontWeight: '1000',
  },
  time: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
    marginBottom: 5,
  },
  dateContainer: {
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 20 : 10,
  },
  date: {
    fontSize: 16,
    color: '#f00',
  },
  timeText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  checkInButtonContainer: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    alignItems: 'center',
  },
  swipeButton: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    backgroundColor: '#e74c3c',
    borderRadius: 100,
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginBottom: 30,
    alignSelf: 'center',
    transform: [{ translateX: -7 }],
  },
  swipeable: {
    width: SWIPEABLE_DIMENSIONS,
    height: SWIPEABLE_DIMENSIONS,
    borderRadius: SWIPEABLE_DIMENSIONS / 2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
  },
  swipeText: {
    fontSize: 15,
    color: '#e74c3c',
  },
  boldText: {
    fontWeight: 'bold',
    marginLeft: 28,
    fontSize: 20,
  },
  largeRedText: {
    fontSize: 3 * 16, // 3 times the default font size
    color: 'red',
    textAlign: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  content: {
    fontSize: 18,
    marginRight: 10,
  },
});

export default styles;
