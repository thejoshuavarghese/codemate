import { getRepository } from "@/lib/repositories";
import ChatClient from "./chat-client";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ matchId: string }>;
}) {
  const { matchId } = await params;
  const repository = getRepository();
  const messages = await repository.getMessages(matchId);

  return <ChatClient matchId={matchId} initialMessages={messages} />;
}
