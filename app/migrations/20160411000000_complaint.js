migration.up = function(migrator) {
    migrator.db.execute('ALTER TABLE ' + migrator.table + ' ADD COLUMN is_complaint INTEGER;');
};

// why would you ever want to go down?   
migration.down = function(migrator) {};
