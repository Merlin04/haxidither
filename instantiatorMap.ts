// map that instantiates instance of class when value corresponding to key is undefined

export const createInstantiatorMap = <TKey, TValue>(create: () => TValue) => {
    const map = new Map<TKey, TValue>();
    let obj = {
        get(key: TKey) {
            if(!map.get(key)) {
                map.set(key, create());
            }
            return map.get(key)!;
        }
    };

    return new Proxy(map, {
        get(target, prop) {
            if(prop === "get") {
                return obj.get;
            }
            const v = (target as any)[prop];
            if(typeof v === "function") {
                return v.bind(target);
            }
            return v;
        }
    }) as Omit<Map<TKey, TValue>, "get"> & { get(key: TKey): TValue };
}