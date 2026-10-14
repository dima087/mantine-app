import {
    Anchor,
    Button,
    Card,
    Container,
    Group,
    PasswordInput,
    Stack,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconLock, IconMail } from '@tabler/icons-react';

export default function App() {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value) =>
                /^\S+@\S+\.\S+$/.test(value) ? null : 'Введите корректный email',
            password: (value) =>
                value.length >= 6 ? null : 'Минимум 6 символов',
        },
    });

    return (
        <Container size={420} my={40}>
            <Title ta="center">Добро пожаловать</Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Войдите, чтобы продолжить
            </Text>

            <Card withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <Stack>
                        <TextInput
                            label="Email"
                            placeholder="you@example.com"
                            leftSection={<IconMail size={16} />}
                            key={form.key('email')}
                            {...form.getInputProps('email')}
                        />

                        <PasswordInput
                            label="Пароль"
                            placeholder="Ваш пароль"
                            leftSection={<IconLock size={16} />}
                            key={form.key('password')}
                            {...form.getInputProps('password')}
                        />

                        <Group justify="space-between">
                            <Anchor component="button" size="sm">
                                Забыли пароль?
                            </Anchor>
                        </Group>

                        <Button type="submit" fullWidth>
                            Войти
                        </Button>
                    </Stack>
                </form>
            </Card>
        </Container>
    );
}