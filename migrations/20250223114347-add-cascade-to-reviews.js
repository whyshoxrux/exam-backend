'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Drop the existing foreign key constraint
    await queryInterface.removeConstraint('reviews', 'reviews_product_id_fkey');

    // Add the new constraint with ON DELETE CASCADE
    await queryInterface.addConstraint('reviews', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'reviews_product_id_fkey',
      references: {
        table: 'products',
        field: 'id',
      },
      onDelete: 'CASCADE', // Delete reviews when product is deleted
      onUpdate: 'CASCADE', // Optional: update product_id if product's id changes
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert to the original constraint without CASCADE
    await queryInterface.removeConstraint('reviews', 'reviews_product_id_fkey');
    await queryInterface.addConstraint('reviews', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'reviews_product_id_fkey',
      references: {
        table: 'products',
        field: 'id',
      },
    });
  },
};