require 'sinatra'

set :bind, '0.0.0.0'   # WSL環境などで必要な場合が多い
set :port, 4567

get '/' do
    erb :index
end

# require 'sqlite3'

# DB = SQLite3::Database.new 'db/ranking.db'
# DB.results_as_hash = true # 結果をハッシュで取得したい場合

# get '/ranking' do
#   @rankings = DB.execute("SELECT player_name, score, created_at FROM rankings ORDER BY score DESC LIMIT 10")
#   erb :ranking # ranking.erb で表示
# end

# post '/ranking' do
#   player_name = params[:player_name]
#   score = params[:score].to_i

#   DB.execute("INSERT INTO rankings (player_name, score) VALUES (?, ?)", [player_name, score])

#   redirect '/ranking'
# end
