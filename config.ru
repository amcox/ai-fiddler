require 'newrelic_rpm'

use Rack::Static, 
  :urls => ["/images", "/js", "/css"],
  :root => "public"

run Proc.new { |env|
  [
    200, 
    {
      'Content-Type'  => 'text/html', 
      'Cache-Control' => 'public, max-age=86400' 
    },
    # File.open( 'public' + env['PATH_INFO'], File::RDONLY)
    File.open( 'public/index.html', File::RDONLY)
  ]
}