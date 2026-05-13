import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Switch, Alert, Animated, Dimensions,
} from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../data/mockData';

const W = Dimensions.get('window').width;

const ROUTE = {
  id: 'B-01',
  name: 'Indiranagar — Koramangala',
  stops: [
    { id: 1, name: 'Indiranagar 100ft Road', time: '7:00 AM', students: ['Aarav Mehta', 'Priya Nair', 'Rohan Das'] },
    { id: 2, name: 'Domlur Junction', time: '7:12 AM', students: ['Saanvi Iyer', 'Karan Shah'] },
    { id: 3, name: 'Koramangala 5th Block', time: '7:22 AM', students: ['Myra Joshi', 'Arjun Pillai', 'Diya Reddy'] },
    { id: 4, name: 'Koramangala 1st Block', time: '7:30 AM', students: ['Vihaan Khan', 'Ishaan Gupta'] },
    { id: 5, name: 'School Gate', time: '7:42 AM', students: [] },
  ],
};

function PulsingDot({ active }) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!active) return;
    const pulse = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scale, { toValue: 1.6, duration: 900, useNativeDriver: true }),
          Animated.timing(scale, { toValue: 1, duration: 900, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(opacity, { toValue: 0.3, duration: 900, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 1, duration: 900, useNativeDriver: true }),
        ]),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [active]);

  return (
    <View style={styles.dotWrap}>
      {active && (
        <Animated.View style={[styles.dotRing, { transform: [{ scale }], opacity }]} />
      )}
      <View style={[styles.dot, { backgroundColor: active ? COLORS.emerald : COLORS.textLight }]} />
    </View>
  );
}

export default function BusDriverScreen() {
  const [routeActive, setRouteActive] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [currentStopIdx, setCurrentStopIdx] = useState(0);
  const [boardedStudents, setBoardedStudents] = useState({});
  const [elapsed, setElapsed] = useState(0);
  const [speed, setSpeed] = useState(0);
  const locationSub = useRef(null);
  const timerRef = useRef(null);

  const startRoute = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setLocationError('Location permission denied. Enable it in Settings to broadcast your position.');
      return;
    }

    setRouteActive(true);
    setElapsed(0);
    setBoardedStudents({});
    setCurrentStopIdx(0);

    // Start live location updates
    locationSub.current = await Location.watchPositionAsync(
      { accuracy: Location.Accuracy.High, timeInterval: 3000, distanceInterval: 5 },
      (loc) => {
        setLocation(loc.coords);
        setSpeed(Math.round((loc.coords.speed || 0) * 3.6)); // m/s → km/h
        // In real app: push loc.coords to Firebase/WebSocket here
        // e.g. socket.emit('location_update', { routeId: 'B-01', coords: loc.coords });
      }
    );

    // Timer
    timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
  };

  const endRoute = () => {
    Alert.alert('End Route', 'Are you sure you want to end the route?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'End Route', style: 'destructive', onPress: () => {
          locationSub.current?.remove();
          clearInterval(timerRef.current);
          setRouteActive(false);
          setLocation(null);
          setSpeed(0);
          setElapsed(0);
          setCurrentStopIdx(0);
          setBoardedStudents({});
        }
      }
    ]);
  };

  useEffect(() => {
    return () => {
      locationSub.current?.remove();
      clearInterval(timerRef.current);
    };
  }, []);

  const toggleStudent = (stopId, studentName) => {
    const key = `${stopId}-${studentName}`;
    setBoardedStudents(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const markStopDone = () => {
    if (currentStopIdx < ROUTE.stops.length - 1) {
      setCurrentStopIdx(i => i + 1);
    }
  };

  const formatElapsed = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const totalStudents = ROUTE.stops.flatMap(s => s.students).length;
  const boardedCount = Object.values(boardedStudents).filter(Boolean).length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>

      {/* Status banner */}
      <View style={[styles.banner, routeActive && styles.bannerActive]}>
        <View style={styles.bannerTop}>
          <View>
            <Text style={styles.bannerLabel}>{routeActive ? 'ROUTE ACTIVE' : 'READY TO START'}</Text>
            <Text style={styles.bannerRoute}>{ROUTE.name}</Text>
            <Text style={styles.bannerBus}>Bus {ROUTE.id} · {ROUTE.stops.length} stops</Text>
          </View>
          <PulsingDot active={routeActive} />
        </View>

        {routeActive && (
          <View style={styles.liveStats}>
            <View style={styles.liveStat}>
              <Text style={styles.liveStatVal}>{formatElapsed(elapsed)}</Text>
              <Text style={styles.liveStatLabel}>ELAPSED</Text>
            </View>
            <View style={styles.liveStatDiv} />
            <View style={styles.liveStat}>
              <Text style={styles.liveStatVal}>{speed} km/h</Text>
              <Text style={styles.liveStatLabel}>SPEED</Text>
            </View>
            <View style={styles.liveStatDiv} />
            <View style={styles.liveStat}>
              <Text style={styles.liveStatVal}>{boardedCount}/{totalStudents}</Text>
              <Text style={styles.liveStatLabel}>BOARDED</Text>
            </View>
            <View style={styles.liveStatDiv} />
            <View style={styles.liveStat}>
              <Text style={styles.liveStatVal}>{currentStopIdx + 1}/{ROUTE.stops.length}</Text>
              <Text style={styles.liveStatLabel}>STOP</Text>
            </View>
          </View>
        )}

        {/* GPS coords */}
        {location && (
          <View style={styles.gpsRow}>
            <Ionicons name="navigate" size={12} color={COLORS.emerald} />
            <Text style={styles.gpsText}>
              {location.latitude.toFixed(5)}, {location.longitude.toFixed(5)}
            </Text>
            <View style={styles.gpsLive}>
              <Text style={styles.gpsLiveText}>BROADCASTING LIVE</Text>
            </View>
          </View>
        )}

        {locationError && (
          <View style={styles.errorRow}>
            <Ionicons name="warning" size={14} color={COLORS.rose} />
            <Text style={styles.errorText}>{locationError}</Text>
          </View>
        )}
      </View>

      {/* Start / End button */}
      {!routeActive ? (
        <TouchableOpacity style={styles.startBtn} onPress={startRoute} activeOpacity={0.85}>
          <Ionicons name="play-circle" size={28} color={COLORS.ink} />
          <Text style={styles.startBtnText}>Start Route</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.endBtn} onPress={endRoute} activeOpacity={0.85}>
          <Ionicons name="stop-circle" size={28} color="#fff" />
          <Text style={styles.endBtnText}>End Route</Text>
        </TouchableOpacity>
      )}

      {/* Progress bar */}
      {routeActive && (
        <View style={styles.progressSection}>
          <Text style={styles.progressLabel}>ROUTE PROGRESS</Text>
          <View style={styles.progressTrack}>
            {ROUTE.stops.map((stop, i) => (
              <React.Fragment key={stop.id}>
                <View style={[
                  styles.progressStop,
                  i < currentStopIdx && styles.progressStopDone,
                  i === currentStopIdx && styles.progressStopCurrent,
                ]}>
                  {i < currentStopIdx
                    ? <Ionicons name="checkmark" size={12} color="#fff" />
                    : <Text style={[styles.progressStopNum, i === currentStopIdx && { color: COLORS.ink }]}>{i + 1}</Text>
                  }
                </View>
                {i < ROUTE.stops.length - 1 && (
                  <View style={[styles.progressLine, i < currentStopIdx && styles.progressLineDone]} />
                )}
              </React.Fragment>
            ))}
          </View>
          <Text style={styles.progressCurrent}>
            Current: {ROUTE.stops[currentStopIdx]?.name}
          </Text>
        </View>
      )}

      {/* Stops & student boarding */}
      <View style={styles.stopsSection}>
        <Text style={styles.sectionTitle}>Stops & Student Boarding</Text>

        {ROUTE.stops.map((stop, idx) => {
          const isPast = idx < currentStopIdx;
          const isCurrent = idx === currentStopIdx;
          const isFuture = idx > currentStopIdx;

          return (
            <View key={stop.id} style={[
              styles.stopCard,
              isCurrent && styles.stopCardCurrent,
              isPast && styles.stopCardPast,
            ]}>
              {/* Stop header */}
              <View style={styles.stopHeader}>
                <View style={[
                  styles.stopNumBadge,
                  isPast && { backgroundColor: COLORS.emerald },
                  isCurrent && { backgroundColor: COLORS.gold },
                ]}>
                  {isPast
                    ? <Ionicons name="checkmark" size={14} color="#fff" />
                    : <Text style={styles.stopNum}>{idx + 1}</Text>
                  }
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.stopName, isFuture && { color: COLORS.textMuted }]}>
                    {stop.name}
                  </Text>
                  <Text style={styles.stopTime}>
                    <Ionicons name="time-outline" size={11} /> {stop.time}
                    {isCurrent && <Text style={styles.nowBadge}> · NOW</Text>}
                    {isPast && <Text style={styles.doneBadge}> · DONE</Text>}
                  </Text>
                </View>
                {stop.students.length > 0 && (
                  <Text style={styles.stopStudentCount}>
                    {stop.students.filter(s => boardedStudents[`${stop.id}-${s}`]).length}/{stop.students.length} boarded
                  </Text>
                )}
              </View>

              {/* Student list */}
              {stop.students.length > 0 && (isCurrent || isPast) && (
                <View style={styles.studentList}>
                  {stop.students.map(student => {
                    const key = `${stop.id}-${student}`;
                    const boarded = boardedStudents[key];
                    return (
                      <TouchableOpacity
                        key={student}
                        style={[styles.studentRow, boarded && styles.studentRowBoarded]}
                        onPress={() => routeActive && toggleStudent(stop.id, student)}
                        disabled={!routeActive}
                        activeOpacity={0.7}
                      >
                        <View style={[styles.studentCheck, boarded && styles.studentCheckDone]}>
                          {boarded && <Ionicons name="checkmark" size={14} color="#fff" />}
                        </View>
                        <Text style={[styles.studentName, boarded && styles.studentNameBoarded]}>
                          {student}
                        </Text>
                        {boarded && <Text style={styles.boardedTag}>Boarded</Text>}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}

              {/* Mark stop done button */}
              {isCurrent && routeActive && idx < ROUTE.stops.length - 1 && (
                <TouchableOpacity style={styles.markDoneBtn} onPress={markStopDone}>
                  <Ionicons name="arrow-forward-circle" size={18} color={COLORS.ink} />
                  <Text style={styles.markDoneBtnText}>Move to Next Stop</Text>
                </TouchableOpacity>
              )}

              {isCurrent && routeActive && idx === ROUTE.stops.length - 1 && (
                <View style={styles.arrivedBanner}>
                  <Ionicons name="school" size={18} color={COLORS.emerald} />
                  <Text style={styles.arrivedText}>Arrived at School!</Text>
                </View>
              )}
            </View>
          );
        })}
      </View>

      {/* Info box about how tracking works */}
      {!routeActive && (
        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={20} color={COLORS.indigo} />
          <View style={{ flex: 1 }}>
            <Text style={styles.infoTitle}>How Live Tracking Works</Text>
            <Text style={styles.infoBody}>
              When you tap "Start Route", your phone's GPS begins broadcasting your location every 3 seconds. Parents and students can see your bus moving in real-time on their map.{'\n\n'}
              Tap each student's name as they board to update their parents instantly.
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.ivory },
  banner: {
    backgroundColor: COLORS.ink,
    padding: 24,
    gap: 16,
  },
  bannerActive: {
    backgroundColor: '#0a1628',
  },
  bannerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  bannerLabel: { fontSize: 10, letterSpacing: 2, color: COLORS.gold, fontWeight: '700', marginBottom: 6 },
  bannerRoute: { fontSize: 20, fontWeight: '800', color: '#fefce8', letterSpacing: -0.3 },
  bannerBus: { fontSize: 13, color: 'rgba(253,230,138,0.5)', marginTop: 4 },
  dotWrap: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  dotRing: {
    position: 'absolute', width: 24, height: 24, borderRadius: 12,
    backgroundColor: COLORS.emerald, opacity: 0.4,
  },
  dot: { width: 14, height: 14, borderRadius: 7 },
  liveStats: {
    flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16, padding: 16, alignItems: 'center',
  },
  liveStat: { flex: 1, alignItems: 'center' },
  liveStatVal: { fontSize: 18, fontWeight: '800', color: '#fefce8', letterSpacing: -0.5 },
  liveStatLabel: { fontSize: 9, letterSpacing: 1.5, color: 'rgba(253,230,138,0.4)', marginTop: 4, textTransform: 'uppercase' },
  liveStatDiv: { width: 1, height: 36, backgroundColor: 'rgba(255,255,255,0.1)' },
  gpsRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  gpsText: { fontSize: 11, color: 'rgba(253,230,138,0.5)', fontFamily: 'monospace', flex: 1 },
  gpsLive: { backgroundColor: COLORS.emerald + '30', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  gpsLiveText: { fontSize: 9, fontWeight: '700', color: COLORS.emerald, letterSpacing: 1 },
  errorRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, backgroundColor: 'rgba(244,63,94,0.15)', padding: 12, borderRadius: 12 },
  errorText: { flex: 1, fontSize: 12, color: '#fca5a5', lineHeight: 18 },
  startBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12,
    backgroundColor: COLORS.gold, margin: 16, borderRadius: 20,
    paddingVertical: 18,
    shadowColor: COLORS.gold, shadowOpacity: 0.4, shadowRadius: 16, shadowOffset: { width: 0, height: 4 },
  },
  startBtnText: { fontSize: 18, fontWeight: '800', color: COLORS.ink },
  endBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12,
    backgroundColor: COLORS.rose, margin: 16, borderRadius: 20,
    paddingVertical: 18,
  },
  endBtnText: { fontSize: 18, fontWeight: '800', color: '#fff' },
  progressSection: { paddingHorizontal: 20, marginBottom: 8 },
  progressLabel: { fontSize: 10, letterSpacing: 2, color: COLORS.textLight, fontWeight: '600', marginBottom: 12, textTransform: 'uppercase' },
  progressTrack: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  progressStop: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: COLORS.stone, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: COLORS.border,
  },
  progressStopDone: { backgroundColor: COLORS.emerald, borderColor: COLORS.emerald },
  progressStopCurrent: { backgroundColor: COLORS.gold, borderColor: COLORS.gold },
  progressStopNum: { fontSize: 12, fontWeight: '700', color: COLORS.textMuted },
  progressLine: { flex: 1, height: 3, backgroundColor: COLORS.border },
  progressLineDone: { backgroundColor: COLORS.emerald },
  progressCurrent: { fontSize: 12, color: COLORS.textMuted },
  stopsSection: { padding: 16, gap: 12 },
  sectionTitle: { fontSize: 10, letterSpacing: 2, color: COLORS.gold, fontWeight: '700', marginBottom: 4, textTransform: 'uppercase' },
  stopCard: {
    backgroundColor: COLORS.white, borderRadius: 20,
    borderWidth: 1.5, borderColor: COLORS.border, overflow: 'hidden',
  },
  stopCardCurrent: { borderColor: COLORS.gold },
  stopCardPast: { borderColor: COLORS.emerald + '60', opacity: 0.85 },
  stopHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 },
  stopNumBadge: {
    width: 32, height: 32, borderRadius: 10,
    backgroundColor: COLORS.stone, alignItems: 'center', justifyContent: 'center',
  },
  stopNum: { fontSize: 14, fontWeight: '800', color: COLORS.textMuted },
  stopName: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  stopTime: { fontSize: 12, color: COLORS.textMuted, marginTop: 3 },
  nowBadge: { color: COLORS.gold, fontWeight: '700' },
  doneBadge: { color: COLORS.emerald, fontWeight: '700' },
  stopStudentCount: { fontSize: 11, fontWeight: '700', color: COLORS.textMuted },
  studentList: { borderTopWidth: 1, borderTopColor: COLORS.border, paddingHorizontal: 16, paddingVertical: 8, gap: 6 },
  studentRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12,
    backgroundColor: COLORS.stone,
  },
  studentRowBoarded: { backgroundColor: '#ecfdf5' },
  studentCheck: {
    width: 26, height: 26, borderRadius: 8,
    borderWidth: 2, borderColor: COLORS.border,
    alignItems: 'center', justifyContent: 'center',
  },
  studentCheckDone: { backgroundColor: COLORS.emerald, borderColor: COLORS.emerald },
  studentName: { flex: 1, fontSize: 14, fontWeight: '600', color: COLORS.text },
  studentNameBoarded: { color: '#065f46', textDecorationLine: 'line-through' },
  boardedTag: { fontSize: 11, fontWeight: '700', color: COLORS.emerald },
  markDoneBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    margin: 12, backgroundColor: COLORS.gold, borderRadius: 14, paddingVertical: 12,
  },
  markDoneBtnText: { fontSize: 14, fontWeight: '700', color: COLORS.ink },
  arrivedBanner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    margin: 12, backgroundColor: '#ecfdf5', borderRadius: 14, paddingVertical: 12,
    borderWidth: 1, borderColor: '#a7f3d0',
  },
  arrivedText: { fontSize: 15, fontWeight: '700', color: '#065f46' },
  infoBox: {
    flexDirection: 'row', gap: 12, margin: 16, marginTop: 4,
    backgroundColor: '#eef2ff', borderRadius: 18, padding: 16,
    borderWidth: 1, borderColor: '#c7d2fe',
  },
  infoTitle: { fontSize: 13, fontWeight: '700', color: '#3730a3', marginBottom: 6 },
  infoBody: { fontSize: 12, color: '#4338ca', lineHeight: 18 },
  indigo: '#6366f1',
});
