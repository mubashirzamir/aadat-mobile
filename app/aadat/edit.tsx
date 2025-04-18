import { Stack } from 'expo-router';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function Edit() {
  return (
    <>
      <Stack.Screen options={{ title: 'Aadat' }} />
      <Container>
        <ScreenContent path="/aadat/edit.tsx" title="Aadat" />
      </Container>
    </>
  );
}
