import dbConn from '../../config/db.config.js';

const Category = {
    getCategoryIdByName: (categoryName) => {
      return new Promise((resolve, reject) => {
        const query = "SELECT category_id FROM category WHERE category_name = ?";
        dbConn.query(query, [categoryName], (err, results) => {
          if (err) {
            console.error("Error fetching category ID:", err);
            return reject(err);
          }
          resolve(results.length > 0 ? results[0].category_id : null);
        });
      });
    },
    getCategoryNameById: (id) => {
      return new Promise((resolve, reject) => {
        const query = "SELECT category_name FROM category WHERE category_id = ?";
        dbConn.query(query, [id], (err, results) => {
          if(err){
            console.error("Error fetching category name:", err);
            return reject(err);
          }
          resolve(results.length > 0 ? results[0].category_name : null);
        });
      });
    },
    getAllCategory: () => {
      return new Promise((resolve, reject) => {
        const query = "SELECT * FROM category";
        dbConn.query(query, (err, results) => {
          if (err) {
            console.error("Error fetching categories:", err);
            return reject(err);
          }
          resolve(results);
        });
      });
    },
  };
  
export default Category;