// const mongoose = require("mongoose");

// const findOne = async (collection, query) => {
//   try {
//     const model = mongoose.model(collection);
//     const result = await model.findOne(query);
//     return result;
//   } catch (error) {
//     console.error(`Error finding ${collection} collection:`, error);
//     throw error;
//   }
// };

// const createOne = async (collection, data) => {
//   try {
//     console.log(collection, data);
//     const model = mongoose.model(collection);
//     const newItem = new model(data);
//     const savedItem = await newItem.save();
//     console.log(`${collection} collection created successfully:`, savedItem);
//     return savedItem;
//   } catch (error) {
//     console.error(`Error creating ${collection} collection:`, error);
//     throw error;
//   }
// };

// const findAll = async (collection) => {
//   try {
//     const model = mongoose.model(collection);
//     const allItems = await model.find();
//     return allItems;
//   } catch (error) {
//     console.error(`Error finding all ${collection} collections:`, error);
//     throw error;
//   }
// };

// const findById = async (collection, id) => {
//   try {
//     const model = mongoose.model(collection);
//     const item = await model.findById(id);
//     return item;
//   } catch (error) {
//     console.error(`Error finding ${collection} by ID:`, error);
//     throw error;
//   }
// };

// const addMany = async (collection, data) => {
//   try {
//     const model = mongoose.model(collection);
//     const insertedItems = await model.insertMany(data);
//     console.log(`${collection} collection items added successfully.`);
//     return insertedItems;
//   } catch (error) {
//     console.error(`Error adding items to ${collection} collection:`, error);
//     throw error;
//   }
// };

// const findByIdAndUpdate = async (collection, id, update) => {
//   try {
//     const model = mongoose.model(collection);
//     const updatedItem = await model.findByIdAndUpdate(id, update, {
//       new: true,
//     });
//     if (!updatedItem) {
//       throw new Error(`No ${collection} found with ID ${id}`);
//     }
//     console.log(`${collection} updated successfully:`, updatedItem);
//     return updatedItem;
//   } catch (error) {
//     console.error(`Error updating ${collection} by ID:`, error);
//     throw error;
//   }
// };

// const findOneAndUpdate = async (collection, query, update) => {
//   try {
//     const model = mongoose.model(collection);
//     const updatedItem = await model.findOneAndUpdate(query, update, {
//       new: true,
//     });
//     if (!updatedItem) {
//       throw new Error(`No ${collection} found with the provided query`);
//     }
//     console.log(`${collection} updated successfully:`, updatedItem);
//     return updatedItem;
//   } catch (error) {
//     console.error(`Error updating ${collection}:`, error);
//     throw error;
//   }
// };

// const deleteOne = async (collection, query) => {
//   try {
//     const model = mongoose.model(collection);
//     const deletedItem = await model.findOneAndDelete(query);
//     if (!deletedItem) {
//       throw new Error(`No ${collection} found with the provided query`);
//     }
//     console.log(`${collection} deleted successfully:`, deletedItem);
//     return deletedItem;
//   } catch (error) {
//     console.error(`Error deleting ${collection}:`, error);
//     throw error;
//   }
// };

// const deleteMany = async (collection, query) => {
//   try {
//     const model = mongoose.model(collection);
//     const deletedItems = await model.deleteMany(query);
//     console.log(
//       `${deletedItems.deletedCount} ${collection} items deleted successfully.`
//     );
//     return deletedItems;
//   } catch (error) {
//     console.error(`Error deleting ${collection}:`, error);
//     throw error;
//   }
// };

// module.exports = {
//   findOne,
//   createOne,
//   findAll,
//   findById,
//   addMany,
//   findByIdAndUpdate,
//   findOneAndUpdate,
//   deleteOne,
//   deleteMany,
// };

const mongoose = require("mongoose");
const cache = require("./cacheFunctions"); // Assuming cacheFunctions.js is in the same directory

const findOne = async (collection, query) => {
  try {
    const cacheKey = `${collection}_${JSON.stringify(query)}`;
    const cachedResult = await cache.getValue(cacheKey);

    if (cachedResult) {
      console.log(`Data retrieved from cache for key: ${cacheKey}`);
      return cachedResult;
    }

    const model = mongoose.model(collection);
    const result = await model.findOne(query);

    await cache.setValue(cacheKey, result);
    console.log(`Data stored in cache for key: ${cacheKey}`);

    return result;
  } catch (error) {
    console.error(`Error finding ${collection} collection:`, error);
    throw error;
  }
};

const createOne = async (collection, data) => {
  try {
    const model = mongoose.model(collection);
    const newItem = new model(data);
    const savedItem = await newItem.save();

    // Invalidate cache for the entire collection after creating a new item
    const cacheKey = collection;
    await cache.deleteValue(cacheKey);

    console.log(`${collection} collection created successfully:`, savedItem);
    return savedItem;
  } catch (error) {
    console.error(`Error creating ${collection} collection:`, error);
    throw error;
  }
};

const findAll = async (collection) => {
  try {
    const cacheKey = collection;
    const cachedResult = await cache.getValue(cacheKey);

    if (cachedResult) {
      console.log(`Data retrieved from cache for collection: ${collection}`);
      return JSON.parse(cachedResult);
    }

    const model = mongoose.model(collection);
    const allItems = await model.find();

    await cache.setValue(cacheKey, JSON.stringify(allItems));
    console.log(`Data stored in cache for collection: ${collection}`);

    return allItems;
  } catch (error) {
    console.error(`Error finding all ${collection} collections:`, error);
    throw error;
  }
};

const findById = async (collection, id) => {
  // try {
  //   const model = mongoose.model(collection);
  //   const item = await model.findById(id);
  //   return item;
  // } catch (error) {
  //   console.error(`Error finding ${collection} by ID:`, error);
  //   throw error;
  // }
  try {
    const cacheKey = `${collection}_${id}`; // Using a combination of collection name and ID as the cache key
    const cachedResult = await cache.getValue(cacheKey);

    if (cachedResult) {
      console.log(`Data retrieved from cache for ${collection} with ID ${id}`);
      return JSON.parse(cachedResult); // Parse JSON string to object
    }

    const model = mongoose.model(collection);
    const item = await model.findById(id);

    await cache.setValue(cacheKey, JSON.stringify(item)); // Convert to JSON string before storing
    console.log(`Data stored in cache for ${collection} with ID ${id}`);

    return item;
  } catch (error) {
    console.error(`Error finding ${collection} by ID:`, error);
    throw error;
  }
};

// const addMany = async (collection, data) => {
//   try {
//     const model = mongoose.model(collection);
//     const insertedItems = await model.insertMany(data);

//     // Clear relevant cache
//     await cache.deleteAll(); // You might need a more specific cache invalidation logic here

//     console.log(`${collection} collection items added successfully.`);
//     return insertedItems;
//   } catch (error) {
//     console.error(`Error adding items to ${collection} collection:`, error);
//     throw error;
//   }
// };

const findByIdAndUpdate = async (collection, id, update) => {
  try {
    const model = mongoose.model(collection);
    const updatedItem = await model.findByIdAndUpdate(id, update, {
      new: true,
    });

    // Clear relevant cache
    await cache.deleteAll(); // You might need a more specific cache invalidation logic here

    if (!updatedItem) {
      throw new Error(`No ${collection} found with ID ${id}`);
    }
    console.log(`${collection} updated successfully:`, updatedItem);
    return updatedItem;
  } catch (error) {
    console.error(`Error updating ${collection} by ID:`, error);
    throw error;
  }
};

const findOneAndUpdate = async (collection, query, update) => {
  try {
    const model = mongoose.model(collection);
    const updatedItem = await model.findOneAndUpdate(query, update, {
      new: true,
    });

    // Clear relevant cache
    await cache.deleteAll(); // You might need a more specific cache invalidation logic here

    if (!updatedItem) {
      throw new Error(`No ${collection} found with the provided query`);
    }
    console.log(`${collection} updated successfully:`, updatedItem);
    return updatedItem;
  } catch (error) {
    console.error(`Error updating ${collection}:`, error);
    throw error;
  }
};

const deleteOne = async (collection, query) => {
  try {
    const model = mongoose.model(collection);
    const deletedItem = await model.findOneAndDelete(query);
    const cacheKey = `${collection}_${JSON.stringify(query)}`;
    await cache.deleteValue(cacheKey);

    if (!deletedItem) {
      throw new Error(`No ${collection} found with the provided query`);
    }

    console.log(`${collection} deleted successfully:`, deletedItem);
    return deletedItem;
  } catch (error) {
    console.error(`Error deleting ${collection}:`, error);
    throw error;
  }

  // try {
  //   const model = mongoose.model(collection);
  //   const deletedItem = await model.findOneAndDelete(query);

  //   // Clear relevant cache
  //   await cache.deleteAll(); // You might need a more specific cache invalidation logic here

  //   if (!deletedItem) {
  //     throw new Error(`No ${collection} found with the provided query`);
  //   }
  //   console.log(`${collection} deleted successfully:`, deletedItem);
  //   return deletedItem;
  // } catch (error) {
  //   console.error(`Error deleting ${collection}:`, error);
  //   throw error;
  // }
};

// const deleteMany = async (collection, query) => {
//   try {
//     const model = mongoose.model(collection);
//     const deletedItems = await model.deleteMany(query);

// Clear relevant cache
//     await cache.deleteAll(); // You might need a more specific cache invalidation logic here

//     console.log(
//       `${deletedItems.deletedCount} ${collection} items deleted successfully.`
//     );
//     return deletedItems;
//   } catch (error) {
//     console.error(`Error deleting ${collection}:`, error);
//     throw error;
//   }
// };

module.exports = {
  findOne,
  createOne,
  findAll,
  findById,
  findByIdAndUpdate,
  findOneAndUpdate,
  deleteOne,
};
