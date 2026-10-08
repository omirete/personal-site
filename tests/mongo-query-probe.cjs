const { Collection } = require(process.cwd() + '/node_modules/mongodb');
for (const method of ['find', 'findOne']) {
    const original = Collection.prototype[method];
    Collection.prototype[method] = function (...args) {
        console.log('[mongo-read]', this.collectionName, method);
        return original.apply(this, args);
    };
}
