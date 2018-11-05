import { BehaviorSubject, Observable } from 'rxjs';

export class TestStore<T> {
  public state: BehaviorSubject<T> = new BehaviorSubject(undefined);

  setState(data: T) {
    this.state.next(data);
  }

  select(selector?: any): Observable<T> {
    return this.state.asObservable();
  }

  dispatch(action: any) {

  }
}
