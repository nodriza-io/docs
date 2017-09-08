/*
Error: Invalid US-ASCII character "\xC5"
        on line 5 of scss/style.scss

1: /**
2:  * GenesisUI - Bootstrap 4 Admin Template
3:  * @version v1.8.5
4:  * @link https://genesisui.com
5:  * Copyright (c) 2017 creativeLabs Łukasz Holeczek
6:  * @license Commercial
7:  *\/
8: // Override Boostrap variables
9: @import "bootstrap-variables";
10: 

Backtrace:
scss/style.scss:5
/usr/lib/ruby/vendor_ruby/sass/util.rb:1323:in `rescue in block in find_encoding_error'
/usr/lib/ruby/vendor_ruby/sass/util.rb:1320:in `block in find_encoding_error'
/usr/lib/ruby/vendor_ruby/sass/util.rb:1319:in `each'
/usr/lib/ruby/vendor_ruby/sass/util.rb:1319:in `each_with_index'
/usr/lib/ruby/vendor_ruby/sass/util.rb:1319:in `find_encoding_error'
/usr/lib/ruby/vendor_ruby/sass/util.rb:896:in `check_sass_encoding'
/usr/lib/ruby/vendor_ruby/sass/engine.rb:423:in `check_encoding!'
/usr/lib/ruby/vendor_ruby/sass/engine.rb:379:in `_to_tree'
/usr/lib/ruby/vendor_ruby/sass/engine.rb:368:in `_render_with_sourcemap'
/usr/lib/ruby/vendor_ruby/sass/engine.rb:285:in `render_with_sourcemap'
/usr/lib/ruby/vendor_ruby/sass/plugin/compiler.rb:489:in `update_stylesheet'
/usr/lib/ruby/vendor_ruby/sass/plugin/compiler.rb:215:in `block in update_stylesheets'
/usr/lib/ruby/vendor_ruby/sass/plugin/compiler.rb:209:in `each'
/usr/lib/ruby/vendor_ruby/sass/plugin/compiler.rb:209:in `update_stylesheets'
/usr/lib/ruby/vendor_ruby/sass/plugin/compiler.rb:293:in `watch'
/usr/lib/ruby/vendor_ruby/sass/plugin.rb:108:in `method_missing'
/usr/lib/ruby/vendor_ruby/sass/exec/sass_scss.rb:366:in `watch_or_update'
/usr/lib/ruby/vendor_ruby/sass/exec/sass_scss.rb:50:in `process_result'
/usr/lib/ruby/vendor_ruby/sass/exec/base.rb:52:in `parse'
/usr/lib/ruby/vendor_ruby/sass/exec/base.rb:19:in `parse!'
/usr/bin/sass:8:in `<main>'
*/
body:before {
  white-space: pre;
  font-family: monospace;
  content: "Error: Invalid US-ASCII character \"\xC5\"\A         on line 5 of scss/style.scss\A \A 1: /**\A 2:  * GenesisUI - Bootstrap 4 Admin Template\A 3:  * @version v1.8.5\A 4:  * @link https://genesisui.com\A 5:  * Copyright (c) 2017 creativeLabs Łukasz Holeczek\A 6:  * @license Commercial\A 7:  */\A 8: // Override Boostrap variables\A 9: @import \"bootstrap-variables\";\A 10: "; }
