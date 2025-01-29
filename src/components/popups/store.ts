import type { Popup } from "./types";

type IsNever<T> = [T] extends [never] ? true : false;

type Subscriber = () => void;

type OpenPopup<Props> = {
  Component: Popup<Props>;
  props: Props;
};

class PopupsStore {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private popups: Map<string, OpenPopup<any>>;
  private subscribers: Set<Subscriber>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private prevSnapshot: OpenPopup<any>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private resolvers: Map<string, (value: any) => void>;

  constructor() {
    this.popups = new Map();
    this.subscribers = new Set();
    this.prevSnapshot = [];
    this.resolvers = new Map();
  }

  subscribe(subscriber: Subscriber) {
    this.subscribers.add(subscriber);
    return () => this.subscribers.delete(subscriber);
  }

  private notify() {
    this.subscribers.forEach((subscriber) => subscriber());
  }

  openPopup<Props extends never>(popup: Popup<Props>): void;
  openPopup<Props>(
    popup: Popup<Props>,
    props: IsNever<Props> extends true ? never : Props
  ): void;
  openPopup<Props>(popup: Popup<Props>, props?: Props) {
    if (this.popups.has(popup.key)) {
      return;
    }

    this.popups.set(popup.key, { Component: popup, props });
    this.notify();
  }

  closePopup<Props extends never>(popup: Popup<Props>): void;
  closePopup<Props>(popup: Popup<Props>): void;
  closePopup<Props, Resolve>(
    popup: Popup<Props, Resolve>,
    data: IsNever<Resolve> extends true ? never : Resolve
  ): void;
  closePopup<Props, Resolve>(popup: Popup<Props, Resolve>, data?: Resolve) {
    if (!this.popups.has(popup.key)) {
      return;
    }

    this.popups.delete(popup.key);
    this.resolvers.get(popup.key)?.(data);
    this.resolvers.delete(popup.key);
    this.notify();
  }

  closeAllPopups() {
    this.popups.clear();
    this.resolvers.clear();
    this.notify();
  }

  awaitPopup<Props, Resolve>(
    popup: Popup<Props, Resolve>,
    props: IsNever<Props> extends true ? never : Props
  ): Promise<Resolve | undefined> {
    this.openPopup(popup, props);
    const promise = new Promise<Resolve>((resolve) => {
      this.resolvers.set(popup.key, resolve);
    });
    return promise;
  }

  private get currentSnapshot() {
    return Array.from(this.popups.values());
  }

  // Not ideal, but works as an example
  // Should be replaced with a proper comparison
  private get areSnapshotsEqual() {
    return (
      JSON.stringify(
        this.prevSnapshot.map(({ Component }) => Component.key)
      ) ===
      JSON.stringify(this.currentSnapshot.map(({ Component }) => Component.key))
    );
  }

  getSnapshot() {
    if (!this.areSnapshotsEqual) {
      this.prevSnapshot = this.currentSnapshot;
    }

    return this.prevSnapshot;
  }
}

export const popupsStore = new PopupsStore();

export const openPopup = popupsStore.openPopup.bind(popupsStore);
export const closePopup = popupsStore.closePopup.bind(popupsStore);
export const closeAllPopups = popupsStore.closeAllPopups.bind(popupsStore);
export const awaitPopup = popupsStore.awaitPopup.bind(popupsStore);
