import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { SafeAreaView } from 'react-native';

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

const orderListNavigator = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingTop: 15 }}>
      <TopTabs>
        <TopTabs.Screen name='index' options={{ title: 'Active' }} />
        <TopTabs.Screen name='archive' options={{ title: 'Archive' }} />
      </TopTabs>
    </SafeAreaView>
  );
};
export default orderListNavigator;
