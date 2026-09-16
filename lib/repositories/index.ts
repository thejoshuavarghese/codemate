import { DemoRepository } from "@/lib/repositories/demo-repository";
import { HackMatchRepository } from "@/lib/repositories/interface";

const repository: HackMatchRepository = new DemoRepository();

export function getRepository(): HackMatchRepository {
  return repository;
}
