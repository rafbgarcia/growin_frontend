1. What are Model Relationships between documents in MongoDB?
2. Explain the difference between Embedded relationships and Referenced relationships in

Relationship between documents refer to how documents relate to each other and the possible ways of achieving it.

Embedded relationships means to embed a document within another one to create a relationship between them (1-1, 1-N, and N-N). Embedding documents is considered a denormalization technique to improve read times. It also provides write atomicity (i.e. creating/updating a document in single operation). It is more often used on relationships that are not used by more than one document and won't cause duplicated data, such as an author's posts, for example.

Notice that documents are limited to 16 MB and 100 levels of nesting. Each object or array adds a level.

Relationships by reference are similar to the ones in traditional RDBMS, you have a field in your document that references another document by its Object ID. It's less scalable as it requires reading from multiple collections. Most developers are used to this kind of relationship as it's been the industry's standard for decades. It's useful for data that is referenced by multiple collections, such as a User record.

### A few gotchas

#### ACID compliancy

Mongo was not initially designed for ACID transactions. Multi-document transactions are now possible but at a performance cost. See the "IMPORTANT" note [here](https://www.mongodb.com/docs/manual/core/data-model-operations/).

Hence, it recommends developers to exercise caution when modeling relationships.

Given that writes are only made to a single primary replica, this may become a scalability bottleneck as the number of user grows.

#### Isolation level

[Among other databases](https://fauna.com/blog/comparison-of-scalable-database-isolation-levels), Mongo has the least multi-partition isolation level (i.e. data consistency guarantees) which can cause [many issues](https://css-tricks.com/consistent-backends-and-ux-what-can-go-wrong/) on a globally distributed app. It can be a burden for the development teams to chase after bugs and work around them, ultimately leading to wasted Engineering time (and money).

#### Active-passive writes

MongoDB scalability model is with primary/secondary replicas. Only one primary replica is allowed to execute write operations, which can cause performance issues for a globally distributed app where every request will be sent to the same node.
