import { Tabs } from 'expo-router';

import { HapticTab } from '@/shared/ui/HapticTab';
import { IconSymbol } from '@/shared/ui/IconSymbol';

import {
  CalendarCheck2,
  KeyRound,
} from 'lucide-react-native';
import { useGetCurrentStudent } from '@/entities/student';
import { useMemo } from 'react';

const AUTH_TABS = [
  {
    name: 'index',
    title: 'Главная страница',
    icon: ({ color }: { color: string }) => (
      <CalendarCheck2 color={color} />
    ),
  },
  {
    name: 'explore',
    title: 'Больше',
    icon: ({ color }: { color: string }) => (
      <IconSymbol
        size={28}
        name="paperplane.fill"
        color={color}
      />
    ),
  },
  {
    name: 'signin',
    title: 'Авторизация',
    icon: ({ color }: { color: string }) => (
      <KeyRound color={color} />
    ),
    href: null,
  },
];

const NOT_AUTH_TABS = [
  {
    name: 'signin',
    title: 'Авторизация',
    icon: ({ color }: { color: string }) => (
      <KeyRound color={color} />
    ),
  },
  {
    name: 'index',
    title: 'Главная страница',
    icon: ({ color }: { color: string }) => (
      <CalendarCheck2 color={color} />
    ),
    href: null,
  },
  {
    name: 'explore',
    title: 'Больше',
    icon: ({ color }: { color: string }) => (
      <IconSymbol
        size={28}
        name="paperplane.fill"
        color={color}
      />
    ),
    href: null,
  },
];

export default function TabLayout() {
  const user = useGetCurrentStudent();

  const tabs = useMemo(() => {
    if (user) return AUTH_TABS;
    else return NOT_AUTH_TABS;
  }, [user]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: tab.icon,
            href: tab.href,
          }}
        />
      ))}
    </Tabs>
  );
}
