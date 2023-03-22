import { randomUUID } from "crypto";
import { Database, get, ref, set, remove } from "firebase/database";

export class PropertyGetterSetterCtor<T> {
    #db: Database;
    #path: string;
    #key: string | undefined;
    #fullpath: string;
    constructor(db: Database, path: string, key?: string) {
        this.#db = db;
        this.#path = path;
        this.#key = key;
        if (key) {
            this.#fullpath = `${this.#path}/${this.#key}`;
        } else {
            this.#fullpath = this.#path;
        }
    }
    get = async (): Promise<T | null> => {
        const db_snap = await get(ref(this.#db, this.#fullpath));
        const item: T | null = db_snap.val();
        return item;
    };
    set = async (value: T): Promise<T> => {
        await set(ref(this.#db, this.#fullpath), value);
        return value;
    };
}

export default class GenericDataObjectCtor<T> {
    #db: Database;
    #path: string;
    constructor(db: Database, path: string) {
        this.#db = db;
        this.#path = path;
    }
    create = async (item: Omit<T, "id">): Promise<T> => {
        const id = randomUUID();
        const newItem = {
            id,
            ...item,
        } as T;
        await set(ref(this.#db, `${this.#path}/${id}`), newItem);
        return newItem;
    };
    update = async (item: T & { id: string }): Promise<T | false> => {
        if (item.id) {
            await set(ref(this.#db, `${this.#path}/${item.id}`), item);
            return item;
        } else {
            return false;
        }
    };
    remove = async (id: string): Promise<boolean> => {
        if (id) {
            await remove(ref(this.#db, `${this.#path}/${id}`));
            return true;
        } else {
            return false;
        }
    };
    getAll = async (): Promise<T[]> => {
        const db_snap = await get(ref(this.#db, this.#path));
        if (db_snap.exists()) {
            const items: T[] = Object.values(db_snap.val());
            return items;
        } else {
            return [];
        }
    };
    getOne = async (id: string): Promise<T | null> => {
        const db_snap = await get(ref(this.#db, `${this.#path}/${id}`));
        const item: T | null = db_snap.val();
        return item;
    };
}
