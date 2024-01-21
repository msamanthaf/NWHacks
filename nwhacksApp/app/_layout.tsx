import { Tabs } from "expo-router/tabs";

export default function Layout() {
  return (
    <Tabs
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen name="HomeScreen" />
      <Tabs.Screen name="ProfileScreen" />
    </Tabs>
  );
}
