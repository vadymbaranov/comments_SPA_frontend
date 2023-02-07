export interface CommentType {
  id: number,
  username: string,
  createdAt: string,
  email: string,
  homepage: string,
  messageText: string,
  responseTo: string | null,
}
