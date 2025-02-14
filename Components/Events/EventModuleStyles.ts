// EventModuleStyles.ts
import { StyleSheet } from 'react-native';

const EventModuleStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  postButtonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    // Android shadow
    elevation: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top', // Ensures text starts at top on Android
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonWrapper: {
    marginLeft: 10,
  },
  eventListContainer: {
    width: '100%',
    marginTop: 10,
  },
  eventItem: {
    padding: 10,
    backgroundColor: '#fafafa',
    marginBottom: 5,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  eventItemTitle: {
    fontWeight: 'bold',
    marginBottom: 3,
  },
  eventItemLocation: {
    fontStyle: 'italic',
    marginBottom: 3,
  },
  eventItemDetails: {
    color: '#333',
  },
  deleteButton: {
      position: 'absolute',
      top: 5,
      right: 5,
      backgroundColor: 'red',
      borderRadius: 15,
      paddingHorizontal: 6,
      paddingVertical: 2,
      zIndex: 1,
  },
  deleteButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 12,
  },
});

export default EventModuleStyles;

