
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TimerPickerModal } from 'react-native-timer-picker'; 

interface TimeSelectorProps {
    startTime: { hour: number; minute: number };
    setStartTime: (time: { hour: number; minute: number }) => void;
    endTime: { hour: number; minute: number };
    setEndTime: (time: { hour: number; minute: number }) => void;
    showStartPicker: boolean;
    setShowStartPicker: (show: boolean) => void;
    showEndPicker: boolean;
    setShowEndPicker: (show: boolean) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({ startTime, setStartTime, endTime, setEndTime, showStartPicker, setShowStartPicker, showEndPicker, setShowEndPicker }) => {
    // Format time to HH:MM string
    const formatTime = (time: { hour: number; minute: number }): string => {
        return `${time.hour.toString().padStart(2, '0')}:${time.minute.toString().padStart(2, '0')}`;
    };


    return (
        <View>
            {/* Start Time */}
            <View style={styles.timeSection}>
            <Text style={styles.label}>Start Time: {formatTime(startTime)}</Text>
            <Button title="Select" onPress={() => setShowStartPicker(true)} />
              </View>
              <TimerPickerModal
                visible={showStartPicker}
                setIsVisible={setShowStartPicker}
                onConfirm={(pickedDuration:any) => {
                  setStartTime({ hour: pickedDuration.hours, minute: pickedDuration.minutes });
                  setShowStartPicker(false);
                }}
                initialValue={{ hours: startTime.hour, minutes: startTime.minute }}
                modalTitle="Pick Start Time"
                onCancel={() => setShowStartPicker(false)}
                hourLabel="h"
                minuteLabel="m"
                use12HourPicker={false} // 24-hour format
                closeOnOverlayPress
              />
      
              {/* End Time */}
              <View style={styles.timeSection}>
                <Text style={styles.label}>End Time: {formatTime(endTime)}</Text>
                <Button title="Select" onPress={() => setShowEndPicker(true)} />
              </View>
              <TimerPickerModal
                visible={showEndPicker}
                setIsVisible={setShowEndPicker}
                onConfirm={(pickedDuration:any) => {
                  setEndTime({ hour: pickedDuration.hours, minute: pickedDuration.minutes });
                  setShowEndPicker(false);
                }}
                initialValue={{ hours: endTime.hour, minutes: endTime.minute }}
                modalTitle="Pick End Time"
                onCancel={() => setShowEndPicker(false)}
                hourLabel="h"
                minuteLabel="m"
                use12HourPicker={false} // 24-hour format
                closeOnOverlayPress
              />
        </View>
    );
};

const styles = StyleSheet.create({

  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  timeSection: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default TimeSelector;