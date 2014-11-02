require 'sinatra'
set :public_folder, '.'
get '/hi' do
  "Hello World!"
end