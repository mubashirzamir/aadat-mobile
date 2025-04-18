import { Stack } from 'expo-router';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function Setup() {
  return (
    <>
      <Stack.Screen options={{ title: 'Setup' }} />
      <Container>
        <ScreenContent path="/setup/index.tsx" title="Setup" />
      </Container>
    </>
  );
}
