import { Button } from 'react-native';
import { trpc } from '../utils/trpc';

export const ChatButton: React.FC = () => {
    const chatCompletionQuery = trpc.chat.chatCompletion.useQuery(void {}, {
        onSettled(data, error) {
            console.log(data, error);
        },
    });

    return (
        <Button title='chat' onPress={() => console.log(chatCompletionQuery)}/>
    );
}