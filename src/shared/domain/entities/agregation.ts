import { Entity } from './entity';

export abstract class AggregateRoot<
  Props = any,
  JsonProps = Required<{ id: string } & Props>,
> extends Entity<Props, JsonProps> { }

export default AggregateRoot;
