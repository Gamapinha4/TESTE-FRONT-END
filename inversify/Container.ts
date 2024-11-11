import { Container } from "inversify";
import { Data } from "./Data";
import "reflect-metadata";

const container = new Container();
container.bind<Data>(Data).toSelf();

export { container };