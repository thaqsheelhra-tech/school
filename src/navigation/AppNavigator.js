import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, ROLES } from '../data/mockData';

import DashboardScreen from '../screens/DashboardScreen';
import TimetableScreen from '../screens/TimetableScreen';
import MessagesScreen from '../screens/MessagesScreen';
import BusDriverScreen from '../screens/BusDriverScreen';
import {
  AttendanceScreen, HomeworkScreen, AnnouncementsScreen, BusScreen,
  ExamsScreen, FeesScreen, GalleryScreen, CalendarScreen,
} from '../screens/FeatureScreens';

const Tab = createBottomTabNavigator();

const ROLE_TABS = {
  student: [
    { name: 'Dashboard', icon: 'home', component: DashboardScreen },
    { name: 'Timetable', icon: 'calendar', component: TimetableScreen },
    { name: 'Homework', icon: 'document-text', component: HomeworkScreen },
    { name: 'Results', icon: 'ribbon', component: ExamsScreen },
    { name: 'Messages', icon: 'chatbubbles', component: MessagesScreen },
  ],
  teacher: [
    { name: 'Dashboard', icon: 'home', component: DashboardScreen },
    { name: 'Attendance', icon: 'checkmark-circle', component: AttendanceScreen },
    { name: 'Homework', icon: 'document-text', component: HomeworkScreen },
    { name: 'Circulars', icon: 'megaphone', component: AnnouncementsScreen },
    { name: 'Messages', icon: 'chatbubbles', component: MessagesScreen },
  ],
  head: [
    { name: 'Dashboard', icon: 'home', component: DashboardScreen },
    { name: 'Attendance', icon: 'checkmark-circle', component: AttendanceScreen },
    { name: 'Fees', icon: 'wallet', component: FeesScreen },
    { name: 'Circulars', icon: 'megaphone', component: AnnouncementsScreen },
    { name: 'Calendar', icon: 'calendar', component: CalendarScreen },
  ],
  parent: [
    { name: 'Dashboard', icon: 'home', component: DashboardScreen },
    { name: 'Attendance', icon: 'checkmark-circle', component: AttendanceScreen },
    { name: 'Bus', icon: 'bus', component: BusScreen },
    { name: 'Fees', icon: 'wallet', component: FeesScreen },
    { name: 'Messages', icon: 'chatbubbles', component: MessagesScreen },
  ],
  driver: [
    { name: 'My Route', icon: 'navigate', component: BusDriverScreen },
    { name: 'Circulars', icon: 'megaphone', component: AnnouncementsScreen },
    { name: 'Messages', icon: 'chatbubbles', component: MessagesScreen },
  ],
};

function CustomHeader({ role, onLogout }) {
  const user = ROLES[role];
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerBrand}>SCHOLARIA</Text>
        <Text style={styles.headerName}>{user.name}</Text>
      </View>
      <View style={styles.headerRight}>
        <View style={[styles.avatar, { backgroundColor: user.color }]}>
          <Text style={styles.avatarText}>{user.avatar}</Text>
        </View>
        <TouchableOpacity onPress={onLogout} style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.textMuted} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function AppNavigator({ role, onLogout }) {
  const tabs = ROLE_TABS[role];
  const user = ROLES[role];

  return (
    <>
      <CustomHeader role={role} onLogout={onLogout} />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: COLORS.gold,
          tabBarInactiveTintColor: COLORS.textLight,
          tabBarLabelStyle: styles.tabLabel,
          tabBarIcon: ({ color, focused, size }) => {
            const tab = tabs.find(t => t.name === route.name);
            return (
              <Ionicons
                name={focused ? tab.icon : `${tab.icon}-outline`}
                size={22}
                color={color}
              />
            );
          },
        })}
      >
        {tabs.map(tab => (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            children={() => <tab.component role={role} />}
          />
        ))}
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.ink,
    paddingHorizontal: 20,
    paddingVertical: 14,
    paddingTop: 54,
  },
  headerBrand: {
    fontSize: 9,
    letterSpacing: 3,
    color: COLORS.gold,
    fontWeight: '700',
  },
  headerName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fefce8',
    letterSpacing: -0.3,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#fff',
  },
  logoutBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    backgroundColor: COLORS.white,
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
    paddingTop: 6,
    paddingBottom: 8,
    height: 70,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
});
