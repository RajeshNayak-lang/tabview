import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  ScrollView,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Projects() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState('All');

  const projects = [
    {
      id: '1',
      title: 'Fitness App',
      description: 'Cross-platform app with workouts, progress tracking, and analytics built in React Native.',
      tags: ['React Native', 'Expo'],
      image: 'https://picsum.photos/400/300?random=1',
      github: 'https://github.com/yourusername/fitness-app',
    },
    {
      id: '2',
      title: 'Portfolio Website',
      description: 'A fast portfolio site with modern animations and accessible UI.',
      tags: ['Next.js', 'React'],
      image: 'https://picsum.photos/400/300?random=2',
      github: 'https://github.com/yourusername/portfolio',
      live: 'https://your-portfolio.dev',
    },
    {
      id: '3',
      title: 'Chat App',
      description: 'Realtime chat with WebSocket integration and a lightweight backend.',
      tags: ['React Native', 'Socket'],
      image: 'https://picsum.photos/400/300?random=3',
      github: 'https://github.com/yourusername/chat-app',
    },
  ];

  const tags = useMemo(() => ['All', ...new Set(projects.flatMap((p) => p.tags))], []);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (tag !== 'All' && !p.tags.includes(tag)) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (p.title + ' ' + p.description + ' ' + p.tags.join(' ')).toLowerCase().includes(q);
    });
  }, [query, tag]);

  const openLink = (url) => Linking.openURL(url);

  const renderProject = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => router.push(`/projects/${item.id}`)}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardBody}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.badgeRow}>
          {item.tags.map((t) => (
            <View key={t} style={styles.badge}><Text style={styles.badgeText}>{t}</Text></View>
          ))}
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={() => openLink(item.github)} style={styles.actionBtn}>
            <FontAwesome name="github" size={16} color="#fff" />
            <Text style={styles.actionText}>GitHub</Text>
          </TouchableOpacity>
          {item.live && (
            <TouchableOpacity onPress={() => openLink(item.live)} style={[styles.actionBtn, styles.liveBtn]}>
              <FontAwesome5 name="external-link-alt" size={14} color="#fff" />
              <Text style={styles.actionText}>Live</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Projects</Text>
      <Text style={styles.subtitle}>Work I’m proud of — tap a card for details.</Text>

      <View style={styles.filtersRow}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search projects..."
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>

      <View style={styles.tagsRow}>
        {tags.map((t) => (
          <TouchableOpacity key={t} style={[styles.tagPill, tag === t && styles.tagActive]} onPress={() => setTag(t)}>
            <Text style={[styles.tagText, tag === t && styles.tagTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        renderItem={renderProject}
        contentContainerStyle={{ paddingTop: 12, paddingBottom: 80 }}
        ListEmptyComponent={<Text style={styles.empty}>No projects match your filter</Text>}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eef2ff',
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2a4d9b',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    marginBottom: 25,
  },
  card: {
    width: '100%',
    backgroundColor: '#f1c4eaff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 4,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  link: {
    fontSize: 16,
    color: '#2a4d9b',
    fontWeight: '600',
  },
  card: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 14,
    elevation: 4,
  },
  cardImage: {
    width: 120,
    height: 120,
  },
  cardBody: {
    flex: 1,
    padding: 14,
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  badge: {
    backgroundColor: '#eef2ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  badgeText: {
    color: '#374151',
    fontSize: 12,
  },
  actionBtn: {
    backgroundColor: '#111827',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  liveBtn: {
    backgroundColor: '#2b6cb0',
  },
  actionText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
  },
  tagsRow: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 6,
    flexWrap: 'wrap',
  },
  tagPill: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#fff',
  },
  tagText: {
    color: '#374151',
  },
  tagActive: {
    backgroundColor: '#2b6cb0',
    borderColor: '#2b6cb0',
  },
  tagTextActive: {
    color: '#fff',
  },
  searchInput: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    flex: 1,
    marginBottom: 10,
  },
  filtersRow: {
    width: '100%',
    marginBottom: 8,
  },
  empty: {
    color: '#666',
    textAlign: 'center',
    marginTop: 30,
  },
});
