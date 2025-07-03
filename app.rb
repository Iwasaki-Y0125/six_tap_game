require 'sinatra'

set :bind, '0.0.0.0'   # WSL環境などで必要な場合が多い
set :port, 4567

get '/' do
    erb :index
end
