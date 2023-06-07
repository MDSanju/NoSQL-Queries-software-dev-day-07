// All NoSQL Queries

// FIND METHODS

// Comparison Query Operators

// Find all 18 ages persons
db.practiceMongooseQueries.find({
    age: { $eq: 18 }
})

// Find all black colors liked persons with only the color property, it is for (project) making
db.practiceMongooseQueries.find({
    color: { $eq: 'Black' }
}).project({
    color: 1
})

// Find all users only without male gender with gender and name properties
db.practiceMongooseQueries.find({
    gender: { $ne: 'Male' }
}).project({
    gender: 1,
    name: 1
})

// Find only grater than 30 ages users
db.practiceMongooseQueries.find({
    age: { $gt: 30 }
}).project({
    age: 1
})

// Find only less than 50 ages users
db.practiceMongooseQueries.find({
    age: { $lt: 50 }
}).project({
    age: 1
})

// Find only grater equelty 18 to less than equelty 64 ages users with sorting user's age serially
db.practiceMongooseQueries.find({
    age: { $gte: 18, $lte: 64 }
}).project({
    age: 1
}).sort({
    // like 18, 19, 20, 21, 22, 23...
    age: 1
    // like 64, 63, 62, 61, 60, 59...
    // age: -1
})

// Find only age 18 and 20 female users conditionally
db.practiceMongooseQueries.find({
    gender: 'Female',
    age: { $in: [18, 20] }
}).project({
    age: 1
})

// Find without age 24 to 30 female users with skill python or java
db.practiceMongooseQueries.find({
    gender: 'Female',
    age: { $nin: [24, 25, 26, 27, 28, 29, 30] },
    skill: { $in: ['Java', 'Python'] }
}).project({
    name: 1,
    age: 1,
    skill
})


// Logical Query Operators

// Find users female only and age should be 16 to 22
db.practiceMongooseQueries.find({
    $and: [
        { gender: 'Female' },
        { age: { $lt: 23, $gte: 16 } }
    ]
}).project({
    gender: 1,
    age: 1
})

// Find same thing above with skill JavaScript
db.practiceMongooseQueries.find({
    $and: [
        { gender: 'Female' },
        { age: { $lt: 23, $gte: 16 } },
        { "skills.name": "JAVASCRIPT" }
    ]
}).project({
    gender: 1,
    age: 1,
    "skills.name": 1
})

// Find if anyone condition matched ($or)
db.practiceMongooseQueries.find({
    $or: [
        { gender: 'Female' },
        { age: { $lt: 25, $gte: 16 } },
        { "skills.name": "PYTHON" }
    ]
}).project({
    gender: 1,
    age: 1,
    "skills.name": 1
})

// Find with any one programming skill
db.practiceMongooseQueries.find({
    $or: [
        { "skills.name": "C++" },
        { "skills.name": "JAVA" },
        { "skills.name": "C#" }
    ]
}).project({
    "skills.name": 1
})

// Same above
db.practiceMongooseQueries.find({
    "skills.name": { $in: ["C++", "JAVA", "C#"] }
}).project({
    "skills.name": 1
})


// Element Query Operators

// Find documents by age field
db.practiceMongooseQueries.find({
    // With age field users
    age: { $exists: true }
    // Without age field users
    // age: { $exists: false }
})

// Find by type checking
db.practiceMongooseQueries.find({
    age: { $type: "int" }
    // or
    // age: { $type: "string" }
    // or
    // friends: { $type: "array" }
})

// Find by array element sizes ($size could be 0, 1, 2, 3 or any size)
db.practiceMongooseQueries.find({
    skills: { $size: 0 }
}).project({
    skills: 1
})


// Array Data Structure Queries

// Find by array's an element
db.practiceMongooseQueries.find({ interests: 'Travelling' }).project({
    interests: 1
})

// Find by array element's position
db.practiceMongooseQueries.find({ 'interests.0': 'Travelling' }).project({
    interests: 1
})

// Find exactly same arrays with the exact position of elements
db.practiceMongooseQueries.find({ interests: ["Travelling", "Cooking", "Gaming"] }).project({
    interests: 1
})

// Find only same elements of arrays, doesn't matter the position
db.practiceMongooseQueries.find({
    interests: { $all: ['Travelling', 'Cooking', 'Gaming'] }
}).project({
    interests: 1
})

// Same output above (equivalent to $and operation)
db.practiceMongooseQueries.find({
    $and: [
        { 'interests': 'Travelling' },
        { 'interests': 'Cooking' },
        { 'interests': 'Gaming' }
    ]
}).project({
    interests: 1
})

// Find objects with the exact properties of the object
db.practiceMongooseQueries.find({
    skills: {
        "name": "JAVA",
        "level": "Expert",
        "isLearning": true
    }
}).project({
    skills: 1
})

// Find objects by only mached properties
db.practiceMongooseQueries.find({
    skills: { $elemMatch: { name: 'JAVA', level: 'Expert' } }
}).project({
    skills: 1
})


// UPDATE METHODS

// Update by ObjectId for adding a new property/totally replacing a property in the object data
db.practiceMongooseQueries.updateOne(
    { _id: ObjectId("6406ad65fc13ae5a400000c3") },
    { $set: { country: "United States" } }
)

// Update an existing array to add a new element with other elements (if same elements have, it won't add again)
db.practiceMongooseQueries.updateOne(
    { _id: ObjectId("6406ad65fc13ae5a400000c3") },
    {
        $addToSet: {
            languages: "English"
        }
    }
)

// Update multiple elements in an existing array
db.practiceMongooseQueries.updateOne(
    { _id: ObjectId("6406ad65fc13ae5a400000c3") },
    {
        $addToSet: {
            languages: { $each: ["French", "German", "Spanish"] }
        }
    }
)

// Update elements fourcefully, doesn't matter same elements have or not
db.practiceMongooseQueries.updateOne(
    { _id: ObjectId("6406ad65fc13ae5a400000c3") },
    {
        $push: {
            languages: { $each: ["French", "German", "Spanish"] }
        }
    }
)

// Remove a property from an object
db.practiceMongooseQueries.updateOne(
    { _id: ObjectId("6406ad65fc13ae5a400000c3") },
    {
        $unset: { interests: 1 }
    }
)

// Remove a property from all objects of DB
db.practiceMongooseQueries.updateMany(
    { _id: ObjectId("6406ad65fc13ae5a400000c3") },
    {
        $unset: { interests: 1 }
    }
)

// Remove first element or property
db.practiceMongooseQueries.updateOne(
    { _id: ObjectId("6406ad65fc13ae5a400000c3") },
    {
        $pop: { languages: -1 }
    }
)

// Remove last element or property
db.practiceMongooseQueries.updateOne(
    { _id: ObjectId("6406ad65fc13ae5a400000c3") },
    {
        $pop: { languages: 1 }
    }
)

// Remove a specific element fourcefully
db.practiceMongooseQueries.updateOne(
    { _id: ObjectId("6406ad65fc13ae5a400000c3") },
    {
        $pull: { languages: 'German' }
    }
)

// Remove more than one elements specifically
db.practiceMongooseQueries.updateOne(
    { _id: ObjectId("6406ad65fc13ae5a400000c3") },
    {
        $pullAll: { languages: ['Malagasy', 'French'] }
    }
)

// Remove specific elements from the hole database
db.practiceMongooseQueries.updateMany(
    {},
    {
        $pullAll: { languages: ['Malagasy', 'French'] }
    }
)

// Delete one object from the array of our database
db.practiceMongooseQueries.deleteOne({ _id: ObjectId("6406ad65fc13ae5a400000bd") })

// Create a new collection in the DB
db.createCollection('microServices')

// Insert a new data in database
db.microServices.insertOne({
    name: "Johny",
    age: 36,
    skills: ['Java', 'Rust', 'C', 'CPP', 'Python']
})

// Completely delete a collection from DB
db.microServices.drop()

// Increament number from DB
db.practiceMongooseQueries.updateOne(
    { _id: ObjectId("6406ad65fc13ae5a400000c7") },
    { $inc: { age: 3 } }
)

// Update for renaming all properties in the collection
db.practiceMongooseQueries.updateMany(
    {},
    { $rename: { "favoutiteColor": "favouriteColor" } }
)
// If we need one specific, then
db.practiceMongooseQueries.updateOne(
    { _id: ObjectId("6406ad65fc13ae5a400000c7") },
    { $rename: { "favoutiteColor": "favouriteColor" } }
)

// Update minimum value
db.practiceMongooseQueries.updateMany(
    {},
    { $set: { minAge: 18 } }
)

// It will never update more than 18 (above), but it will update below 18 by using $min
db.practiceMongooseQueries.updateMany(
    {},
    { $min: { minAge: 17 } }
)
