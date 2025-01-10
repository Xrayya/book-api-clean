export interface ITokenizer {
  encode(data: string | Buffer | object): string;
  decode(token: string): any;
}
