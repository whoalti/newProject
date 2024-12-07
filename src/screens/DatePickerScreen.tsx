import React, {useState} from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import DatePicker from 'react-native-date-picker';

function DatePickerScreen():React.JSX.Element {
    const [date, setDate] = useState(new Date());
    return (
    <SafeAreaView>
      <View >
        <Text >DatePicker screen</Text>
        <DatePicker date={date} onDateChange={setDate} />
      </View>
      <View>
        <Text>{date.toDateString()} {date.toISOString()}</Text>
      </View>
    </SafeAreaView>
  );
}

export default DatePickerScreen;