// style.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // ... existing styles
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  eventsList: {
    flex: 1,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8,
  },
  dropdown: {
    borderColor: '#ccc',
    borderRadius: 8,
    minHeight: 40,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  dropdownContainer: {
    flex: 1,
    marginBottom: 8,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  eventInfo: {
    marginLeft: 12,
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  eventDateTime: {
    color: '#666',
    marginBottom: 4,
  },
  eventAttendees: {
    color: '#666',
    fontSize: 12,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    right: 16, // assuming you want it on the upper right
    zIndex: 1,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
  },
  // New button styles
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
  },
  deleteButton: {
    backgroundColor: 'red',
    marginTop: 10,
  },
  // TODO: Add styles for the event details screen
  eventDetails: {
    padding: 16,
  },
  eventDescription: {
    marginBottom: 16,
  },
  eventLocation: {
    marginBottom: 16,
  },
  attendBtn: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    margin: 16,
    width: '30%',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  disabledBtn: {
    backgroundColor: 'gray',
    padding: 16,
    borderRadius: 8,
    margin: 16,
    width: '30%',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center', 
    opacity: 0.5,
  },
});

export default styles;