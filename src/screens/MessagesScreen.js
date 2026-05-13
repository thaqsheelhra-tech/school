import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, FlatList, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../data/mockData';

const CHATS = [
  { id: 1, name: 'Ms. Priya Sharma', last: 'Aarav has shown excellent progress in algebra.', time: '10:42 AM', unread: 0, avatar: 'PS' },
  { id: 2, name: 'Mr. Arjun Kapoor', last: 'Please review the essay topic for Friday.', time: 'Yesterday', unread: 2, avatar: 'AK' },
  { id: 3, name: 'Class Teacher (9A)', last: 'PTM scheduled for Saturday — please confirm.', time: 'Yesterday', unread: 1, avatar: 'CT' },
  { id: 4, name: "Principal's Office", last: 'Thank you for attending the parent forum.', time: '2 days', unread: 0, avatar: 'PO' },
  { id: 5, name: 'Transport Desk', last: 'Bus B-01 route diversion — see notice.', time: '3 days', unread: 0, avatar: 'TD' },
];

const MESSAGES = [
  { id: 1, from: 'them', text: 'Good morning! Aarav has shown excellent progress in algebra this week.', time: '10:32 AM' },
  { id: 2, from: 'me', text: "That's wonderful to hear! He's been practicing at home consistently.", time: '10:38 AM' },
  { id: 3, from: 'them', text: "It really shows. He scored 92/100 in the quiz. I'd like to recommend the advanced problem set.", time: '10:42 AM' },
];

export default function MessagesScreen() {
  const [active, setActive] = useState(null);
  const [text, setText] = useState('');

  if (active) {
    const chat = CHATS.find(c => c.id === active);
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={() => setActive(null)} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <View style={styles.chatAvatar}>
            <Text style={styles.chatAvatarText}>{chat.avatar}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.chatName}>{chat.name}</Text>
            <Text style={styles.chatOnline}>● Online</Text>
          </View>
          <Ionicons name="call-outline" size={22} color={COLORS.textMuted} />
          <Ionicons name="videocam-outline" size={22} color={COLORS.textMuted} style={{ marginLeft: 16 }} />
        </View>

        <ScrollView style={styles.messages} contentContainerStyle={{ padding: 16, gap: 12 }}>
          {MESSAGES.map(m => (
            <View key={m.id} style={[styles.msgRow, m.from === 'me' && styles.msgRowMe]}>
              <View style={[styles.bubble, m.from === 'me' ? styles.bubbleMe : styles.bubbleThem]}>
                <Text style={[styles.bubbleText, m.from === 'me' && styles.bubbleTextMe]}>{m.text}</Text>
                <Text style={[styles.bubbleTime, m.from === 'me' && styles.bubbleTimeMe]}>{m.time}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputRow}>
          <Ionicons name="attach" size={22} color={COLORS.textMuted} />
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Type your message..."
            placeholderTextColor={COLORS.textLight}
          />
          <TouchableOpacity style={styles.sendBtn}>
            <Ionicons name="send" size={18} color={COLORS.ink} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.ivory }}>
      <View style={styles.searchRow}>
        <Ionicons name="search" size={16} color={COLORS.textLight} />
        <TextInput style={styles.search} placeholder="Search messages..." placeholderTextColor={COLORS.textLight} />
      </View>
      <FlatList
        data={CHATS}
        keyExtractor={c => c.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.chatRow} onPress={() => setActive(item.id)}>
            <View style={styles.avatarBox}>
              <Text style={styles.avatarText}>{item.avatar}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.chatRowHeader}>
                <Text style={styles.chatRowName}>{item.name}</Text>
                <Text style={styles.chatRowTime}>{item.time}</Text>
              </View>
              <Text style={styles.chatRowLast} numberOfLines={1}>{item.last}</Text>
            </View>
            {item.unread > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.unread}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: COLORS.white, margin: 16, borderRadius: 14,
    paddingHorizontal: 14, paddingVertical: 10,
    borderWidth: 1, borderColor: COLORS.border,
  },
  search: { flex: 1, fontSize: 14, color: COLORS.text },
  chatRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 12, backgroundColor: COLORS.white },
  avatarBox: { width: 48, height: 48, borderRadius: 14, backgroundColor: '#d1fae5', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 14, fontWeight: '700', color: '#065f46' },
  chatRowHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  chatRowName: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  chatRowTime: { fontSize: 11, color: COLORS.textLight },
  chatRowLast: { fontSize: 12, color: COLORS.textMuted },
  badge: { width: 22, height: 22, borderRadius: 11, backgroundColor: COLORS.gold, alignItems: 'center', justifyContent: 'center' },
  badgeText: { fontSize: 11, fontWeight: '700', color: COLORS.ink },
  sep: { height: 1, backgroundColor: COLORS.border, marginLeft: 76 },
  chatHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 16, paddingVertical: 14,
    backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  backBtn: { marginRight: 4 },
  chatAvatar: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#d1fae5', alignItems: 'center', justifyContent: 'center' },
  chatAvatarText: { fontSize: 13, fontWeight: '700', color: '#065f46' },
  chatName: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  chatOnline: { fontSize: 11, color: COLORS.emerald, marginTop: 2 },
  messages: { flex: 1, backgroundColor: COLORS.ivory },
  msgRow: { alignItems: 'flex-start' },
  msgRowMe: { alignItems: 'flex-end' },
  bubble: { maxWidth: '80%', borderRadius: 18, padding: 12 },
  bubbleMe: { backgroundColor: COLORS.ink, borderBottomRightRadius: 4 },
  bubbleThem: { backgroundColor: COLORS.white, borderBottomLeftRadius: 4, borderWidth: 1, borderColor: COLORS.border },
  bubbleText: { fontSize: 14, color: COLORS.text, lineHeight: 20 },
  bubbleTextMe: { color: '#fef3c7' },
  bubbleTime: { fontSize: 10, color: COLORS.textLight, marginTop: 4 },
  bubbleTimeMe: { color: 'rgba(253,230,138,0.5)' },
  inputRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 12, backgroundColor: COLORS.white,
    borderTopWidth: 1, borderTopColor: COLORS.border,
  },
  input: { flex: 1, backgroundColor: COLORS.stone, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, fontSize: 14, color: COLORS.text },
  sendBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.gold, alignItems: 'center', justifyContent: 'center' },
});
