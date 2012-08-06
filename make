#!/usr/bin/env ruby

require 'fileutils'

GOOGLE_CLOSURE_REPO = 'http://closure-library.googlecode.com/svn/trunk/'
JQUERY_TEMPLATES =
    'https://raw.github.com/jquery/jquery-tmpl/master/jquery.tmpl.min.js'
TWITTER_BOOTSTRAP = 'http://twitter.github.com/bootstrap/assets/bootstrap.zip'
TMPDIR = 'tmp'

cwd = Dir.pwd
FileUtils.mkdir_p TMPDIR
Dir.chdir TMPDIR

puts 'Downloading Google Closure library...'
`svn checkout #{GOOGLE_CLOSURE_REPO}`

puts 'Downloading JQuery Templates...'
`curl #{JQUERY_TEMPLATES} > jquery.tmpl.min.js`

puts 'Downloading Twitter Bootstrap library...'
`curl #{TWITTER_BOOTSTRAP} > bootstrap.zip && unzip bootstrap.zip`

Dir.chdir cwd

puts 'Installing node modules...'
`npm install`

puts 'Cleaning up...'
FileUtils.mkdir_p 'public'
FileUtils.mkdir_p 'public/javascripts'
FileUtils.mkdir_p 'public/stylesheets'
# TODO(gareth): Figure out why this yells about .svn
begin
  FileUtils.cp_r(
      "#{TMPDIR}/trunk/closure/goog",
      'public/javascripts/closure')
rescue
end
FileUtils.cp(
    "#{TMPDIR}/jquery.tmpl.min.js",
    'public/javascripts')
FileUtils.cp(
    "#{TMPDIR}/bootstrap/css/bootstrap.min.css",
    'public/stylesheets')
FileUtils.cp(
    "#{TMPDIR}/bootstrap/css/bootstrap-responsive.min.css",
    'public/stylesheets')
FileUtils.rm_r TMPDIR, :force => true

puts 'Done.'
