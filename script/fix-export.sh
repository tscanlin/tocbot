#!/bin/bash

grep --regexp=/*html$/ -rnl './site' -e "/app.js" | xargs -i@ sed -i 's/\/app\.js/\/tocbot\/app\.js/g' @
grep --regexp=/*/ -rnl './site' -e "/static/css" | xargs -i@ sed -i 's/\/static\/css/\/tocbot\/static\/css/g' @
