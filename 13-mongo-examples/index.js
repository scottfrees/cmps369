// Loads environment variables from a .env file - if present.
// Should be the firs thing you do.
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;

// If we are connecting locally, then no need for an environment variable
const url = process.env.MONGO_URL || 'mongodb://localhost:27017/test';

// Remember you can't use await in the global scope, 
// we can only use await inside an async function.
const run = async () => {
    let connection;
    try {
        connection = await MongoClient.connect(url);
        const db = connection.db('cmps369');
        const courses = await db.createCollection("courses");

        // Delete any existing ones... so we can run this example over and over again..
        await courses.deleteMany({});

        // Insert a few courses
        await courses.insertOne({ name: 'Introduction to Computer Science', subject: 'CMPS', number: 147 });
        await courses.insertOne({ name: 'Data Structures and Algorithms', subject: 'CMPS', number: 231 });
        await courses.insertOne({ name: 'Web Development', subject: 'CMPS', number: 369 });
        await courses.insertOne({ name: 'Databases', subject: 'CMPS', number: 364 });
        await courses.insertOne({ name: 'Operating Systems', subject: 'CMPS', number: 311 });

        // Simple queries
        const classes = await courses.find({}).toArray();
        console.log(classes.map(c => `${c.subject} ${c.number}`).join('\n'));

        const easy_classes = await courses.find({ number: { $lt: 300 } }).toArray();
        console.log(easy_classes);

        // Updating a course
        await courses.updateOne({ number: 364 }, { $set: { name: 'Database Systems' } });

        // Another query.
        const hard_classes = await courses.find({ number: { $gte: 300 } }).toArray();
        console.log(hard_classes.map(c => `${c.subject} ${c.number}`).join('\n'));
    } catch (ex) {
        console.error(ex);
    } finally {
        connection.close();
    }
}

run();