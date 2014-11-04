require "rack/jekyll"
require "yaml"
require "bundler"
Bundler.require

run Rack::Jekyll.new
