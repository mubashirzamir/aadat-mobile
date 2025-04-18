import { Link, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import LocalAadatService from '~/services/local-aadat-service';

export default function List() {
  const [aadatMetaMap, setAadatMetaMap] = useState<Record<number, AadatMeta>>({});
  const [aadatMap, setAadatMap] = useState<Record<number, Aadat>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAadatService = async () => {
      try {
        const [aadatMetaMap, aadatMap] = await LocalAadatService.initialize();        
        
        setAadatMetaMap(aadatMetaMap);
        setAadatMap(aadatMap);
      } catch (error) {
        console.error('Initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAadatService();
  }, []);

  if (loading) {
    return (
      <Container>
        <Text>Loading...</Text>
      </Container>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Aadats' }} />
      <Container>
        <ScreenContent path="/aadat/list.tsx" title="Aadats" />
        <View style={{ gap: 10 }}>
          {Object.entries(aadatMetaMap).map(([id, meta]) => (
            <Link key={id} href={{ pathname: '/aadat/edit', params: { id: parseInt(id) } }} asChild>
              <Button title={`Aadat ${meta.name}`} />
            </Link>
          ))}
        </View>
      </Container>
    </>
  );
}