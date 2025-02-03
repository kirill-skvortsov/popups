/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IsNever, Popup } from "./types";

type Subscriber = () => void;

type PopupObject<Props, Result> = {
  Component: Popup<Props, Result>;
  key: string;
  initialProps: Props;
};

class PopupsStore {
  private popups: PopupObject<any, any>[];
  private resolvers: WeakMap<Popup<any>, (value: any) => void>;
  private localPopups: WeakSet<Popup<any>>;

  private subscribers: Set<Subscriber>;
  private prevSnapshot: PopupObject<any, any>[];

  constructor() {
    this.popups = [];
    this.resolvers = new WeakMap();
    this.localPopups = new WeakSet();

    this.subscribers = new Set();
    this.prevSnapshot = [];
  }

  subscribe(subscriber: Subscriber) {
    this.subscribers.add(subscriber);
    return () => this.subscribers.delete(subscriber);
  }

  private notify() {
    this.subscribers.forEach((subscriber) => subscriber());
  }

  private generateKey() {
    return crypto.randomUUID();
  }

  openPopup<Props extends never>(popup: Popup<Props>): void;
  openPopup<Props>(
    popup: Popup<Props>,
    initialProps: IsNever<Props> extends true ? never : Props
  ): void;
  openPopup<Props>(popup: Popup<Props>, initialProps?: Props) {
    if (this.popups.some(({ Component }) => Component === popup)) {
      return;
    }

    this.popups.push({
      Component: popup,
      key: this.generateKey(),
      initialProps,
    });
    this.notify();
  }

  closePopup<Props extends never>(popup: Popup<Props>): void;
  closePopup<Props>(popup: Popup<Props>): void;
  closePopup<Props, Result>(
    popup: Popup<Props, Result>,
    data: IsNever<Result> extends true ? never : Result
  ): void;
  closePopup<Props, Result>(popup: Popup<Props, Result>, data?: Result) {
    if (!this.popups.some(({ Component }) => Component === popup)) {
      return;
    }

    this.popups = this.popups.filter(({ Component }) => Component !== popup);
    this.resolvers.get(popup)?.(data);
    this.resolvers.delete(popup);
    this.notify();
  }

  closeAllPopups() {
    this.popups = [];
    this.resolvers = new WeakMap();
    this.notify();
  }

  awaitPopup<Props, Result>(
    popup: Popup<Props, Result>,
    initialProps: IsNever<Props> extends true ? never : Props
  ): Promise<Result | undefined> {
    this.openPopup(popup, initialProps);
    const promise = new Promise<Result>((resolve) => {
      this.resolvers.set(popup, resolve);
    });
    return promise;
  }

  private get areSnapshotsEqual() {
    return (
      this.prevSnapshot.length === this.popups.length &&
      this.prevSnapshot.every(
        (popup, index) => this.popups[index].Component === popup.Component
      )
    );
  }

  getSnapshot() {
    if (!this.areSnapshotsEqual) {
      this.prevSnapshot = this.popups.slice();
    }

    return this.prevSnapshot;
  }

  makeLocal<Props, Result>(popup: Popup<Props, Result>) {
    this.localPopups.add(popup);
    this.notify();

    return () => {
      this.localPopups.delete(popup);
      this.notify();
    };
  }

  get local() {
    return this.localPopups;
  }
}

export const popupsStore = new PopupsStore();

export const openPopup = popupsStore.openPopup.bind(popupsStore);
export const closePopup = popupsStore.closePopup.bind(popupsStore);
export const closeAllPopups = popupsStore.closeAllPopups.bind(popupsStore);
export const awaitPopup = popupsStore.awaitPopup.bind(popupsStore);
export const makeLocal = popupsStore.makeLocal.bind(popupsStore);
