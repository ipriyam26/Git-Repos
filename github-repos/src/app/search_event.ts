import { Repository } from "./repository";
import { User } from "./user";

export interface SearchEvent {
    user: User;
    repositories: Repository[];
  }