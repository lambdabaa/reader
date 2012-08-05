#!/usr/bin/env ruby
# This needs to be run from the root reader directory

require 'FileUtils'

GOOGLE_CLOSURE_REPO = 'http://closure-library.googlecode.com/svn/trunk/'
TWITTER_BOOTSTRAP = 'http://twitter.github.com/bootstrap/assets/bootstrap.zip'
TMPDIR = 'tmp'

cwd = Dir.pwd
Dir.mkdir TMPDIR
Dir.chdir TMPDIR

puts 'Downloading Google Closure library...'
`svn checkout #{GOOGLE_CLOSURE_REPO}`

puts 'Downloading Twitter Bootstrap library...'
`curl #{TWITTER_BOOTSTRAP} > bootstrap.zip && unzip bootstrap.zip`

Dir.chdir cwd

puts 'Installing node modules...'
`npm install`

puts 'Cleaning up...'
FileUtils.mkdir_p('public')
FileUtils.mkdir_p('public/javascripts')
FileUtils.mkdir_p('public/stylesheets')
# TODO(gareth): Figure out why this yells about .svn
begin
  FileUtils.cp_r(
      "#{TMPDIR}/trunk/closure/goog",
      'public/javascripts/closure')
rescue
end
FileUtils.cp(
    "#{TMPDIR}/bootstrap/css/bootstrap.min.css",
    'public/stylesheets')
FileUtils.cp(
    "#{TMPDIR}/bootstrap/css/bootstrap-responsive.min.css",
    'public/stylesheets')
FileUtils.rm_r(TMPDIR, :force => true)

puts 'Done.'
