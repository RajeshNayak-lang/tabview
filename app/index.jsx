import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  Animated,
  TextInput,
  FlatList,
  Pressable,
} from 'react-native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Animated avatar + title
  const scale = useRef(new Animated.Value(0.85)).current;
  const fade = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
      Animated.timing(fade, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const [query, setQuery] = useState('');
  const features = [
    { id: '1', name: 'React Native', icon: 'mobile-alt' },
    { id: '2', name: 'Performance', icon: 'rocket' },
    { id: '3', name: 'UI / UX', icon: 'palette' },
    { id: '4', name: 'Open Source', icon: 'github' },
  ];

  const projects = [
    { id: 'p1', title: 'Fitness App', subtitle: 'React Native, Expo', color: '#fdcb6e' },
    { id: 'p2', title: 'Portfolio', subtitle: 'Next.js + React Native', color: '#74b9ff' },
    { id: 'p3', title: 'Chat App', subtitle: 'Fresh UI', color: '#a29bfe' },
  ];

  return (
    <ScrollView contentContainerStyle={[styles.container, { paddingTop: 20 + insets.top }]}> 
      <StatusBar barStyle="light-content" />

      <Animated.View style={[styles.hero, { transform: [{ scale }], opacity: fade }]}> 
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s' }}
          style={styles.avatar}
        />

        <View style={styles.heroText}>
          <Text style={styles.title}>Hi, I'm Rajesh</Text>
          <Text style={styles.subtitle}>I build delightful mobile & web experiences</Text>
        </View>
      </Animated.View>

      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search projects, skills or blog..."
          placeholderTextColor="#bdbdbd"
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.searchButton} onPress={() => console.log('Search for', query)}>
          <FontAwesome name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.aboutContainer}>
        <Text style={styles.aboutTitle}>About Me</Text>
        <Text style={styles.aboutText}>
          I'm a passionate developer who loves building mobile and web apps. I enjoy
          learning new technologies, creating beautiful user interfaces, and
          solving challenging problems. In my free time I explore design trends,
          contribute to open-source, and experiment with side projects.
        </Text>
      </View>

      <View style={styles.featureRow}>
        {features.map((f) => (
          <Pressable key={f.id} style={styles.featureCard} onPress={() => console.log('open', f.name)}>
            <FontAwesome5 name={f.icon} size={24} color="#333" />
            <Text style={styles.featureText}>{f.name}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Latest Projects</Text>
        <FlatList
          data={projects}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingLeft: 20, paddingRight: 12 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.projectCard, { backgroundColor: item.color }]}
              onPress={() => router.push('/projects')}
            >
              <Text style={styles.projectTitle}>{item.title}</Text>
              <Text style={styles.projectSub}>{item.subtitle}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.cardsContainer}>
        <TouchableOpacity style={[styles.card, { backgroundColor: '#6c5ce7' }]} onPress={() => router.push('/about')}>
          <FontAwesome5 name="user" size={40} color="#fff" />
          <Text style={styles.cardText}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { backgroundColor: '#fd79a8' }]} onPress={() => router.push('/projects')}>
          <FontAwesome5 name="th-large" size={40} color="#fff" />
          <Text style={styles.cardText}>Projects</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { backgroundColor: '#e17055' }]} onPress={() => router.push('/contact')}>
          <FontAwesome5 name="phone" size={40} color="#fff" />
          <Text style={styles.cardText}>Contact</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#4e54c8',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 18,
    color: '#ddd',
    marginBottom: 30,
  },
  aboutContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 40,
  },
  aboutTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 16,
    color: '#f0f0f0',
    lineHeight: 22,
    textAlign: 'center',
  },
  cardsContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    width: '40%',
    height: 120,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    marginBottom: 20,
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  hero: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
    paddingTop: 8,
  },
  heroText: {
    alignItems: 'center',
    marginTop: 6,
  },
  searchRow: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 18,
  },
  searchInput: {
    backgroundColor: '#ffffff20',
    borderRadius: 12,
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    color: '#fff',
  },
  searchButton: {
    marginLeft: 8,
    backgroundColor: '#2b6cb0',
    padding: 12,
    borderRadius: 10,
  },
  featureRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  featureCard: {
    backgroundColor: '#ffffff',
    padding: 12,
    width: '23%',
    borderRadius: 12,
    alignItems: 'center',
  },
  featureText: {
    fontSize: 11,
    marginTop: 6,
    color: '#333',
    textAlign: 'center',
  },
  section: {
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 20,
    marginBottom: 12,
  },
  projectCard: {
    width: 220,
    height: 120,
    borderRadius: 14,
    padding: 15,
    marginRight: 12,
  },
  projectTitle: {
    fontWeight: '800',
    color: '#222',
    fontSize: 16,
  },
  projectSub: {
    color: '#222',
    opacity: 0.8,
    marginTop: 8,
  },
});