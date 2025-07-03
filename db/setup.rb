# require 'sqlite3'

# # dbフォルダを作っておく
# db = SQLite3::Database.new 'db/ranking.db'

# db.execute <<-SQL
#   CREATE TABLE IF NOT EXISTS rankings (
#     id INTEGER PRIMARY KEY AUTOINCREMENT,
#     player_name TEXT NOT NULL,
#     score INTEGER NOT NULL,
#     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
#   );
# SQL

# puts "テーブル作成完了"
