/*
 * Copyright 2018 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* eslint-env mocha */
process.env.HELIX_FETCH_FORCE_HTTP1 = 'true';

const fs = require('fs-extra');
const assert = require('assert');
const path = require('path');
const {
  include, synthetize, regex, injectConsts,
} = require('../src/fastly/include-util');
const tinyRgx = require('./fixtures/tinyrgx.js');

describe('Testing include-util.js', () => {
  ['simple'].forEach((f) => {
    it('#include', () => {
      const res = include(path.resolve(__dirname, `fixtures/include-${f}.vcl`));
      const expect = fs.readFileSync(path.resolve(__dirname, `fixtures/include-${f}-resolved.vcl`)).toString();
      assert.equal(res, expect);
    });

    it('#synthetize', () => {
      const res = synthetize('some content', '');
      assert.equal(res, 'some content');
    });

    it('#synthetize', () => {
      const res = synthetize('some content with an include\nsynthetic {"include:include.html"};\n', path.resolve(__dirname, 'fixtures'));
      assert.equal(res, 'some content with an include\nsynthetic {"<html lang="en_US">\n  Haha!\n</html>"};\n');
    });

    it('#regex', () => {
      const res = regex('some content with a {"regex:block.rgx"}', tinyRgx);
      assert.equal(res, 'some content with a "^/myaccount\\.php$|^/\\.guile_history$|^/\\.catalog$|^/\\.helm/values\\.yaml$|^/errors/$|^/admin\\.inc\\.conf$|^/admin_edite\\.json$|^/adovbs\\.inc$|^/newsadmin/$|^/faq_admin\\.sql$|^/\\.spyproject$|^/cmsample/$|^/test\\.asp$|^/bitrix/import/import$|^/smf/$|^/stronghold-info$|^/new\\.php$|^/citrix/AccessPlatform/auth/$|^/2000$|^/bluadmin$|^/\\.binstar\\.yml$|^/publication_list\\.xml$|^/settings\\.php\\.bak$|^/admin_tdet\\.json$|^/phpinfo\\.txt$|^/WEB-INF/jetty-env\\.xml$|^/Sites/Samples/Knowledge/Search/ViewCode\\.json$|^/bigdump\\.php$|^/catalog_admin\\.sql$|^/uri$|^/admin_edit\\.aspx$|^/r\\.php$|^/gb_admin\\.aspx$|^/\\.curlrc$|^/rd\\.sql$|^/bea_wls_internal/iiop/ClientSend$|^/up\\.php$|^/admin-post\\.txt$|^/admin2/login\\.asp$|^/adminlogon/$|^/sys_log/$|^/dialog/oauth/$|^/admin-header\\.aspx$|^/admloginuser\\.db$|^/2019\\.zip$|^/member/login\\.json$|^/admin\\.cgi$|^/panel-administracion/index\\.aspx$|^/modules/admin/$|^/moderator/login\\.sql$|^/addadmin\\.sql$|^/inc/tinymce/$|^/backend_dev/$|^/SaveForLater\\.json$|^/libraries$|^/database\\.csv$|^/asp/$|^/admin_paylog\\.txt$|^/phpMyAdmin-3\\.1\\.2/$|^/phpMyAds/$|^/admin_userdet\\.conf$|^/killer\\.php$|^/WEB-INF/components\\.xml$|^/isapi/$|^/download/history\\.csv$|^/actions_admin\\.aspx$|^/SaveForLater\\.db$|^/user\\.asp$|^/ad_admin\\.sql$|^/l0gs\\.txt$|^/\\.checkignore$|^/ids_log\\.aspx$|^/vb\\.rar$|^/orasso$|^/members/login\\.json$|^/_webalizer/$|^/exchange/logon\\.aspx$|^/admin_censoring\\.conf$|^/adminlist\\.php$|^/wp-admin/post.php$"');
    });
  });

  it('replaces constants in content', () => {
    const constants = {
      dispatch: 'v1',
      spe$ial: 'v5',
    };
    const content = 'Test dispatch@{"const:dispatch"}, and {"const:spe$ial"} and dispatch@{"const:dispatch"} again.';
    const expected = 'Test dispatch@"v1", and "v5" and dispatch@"v1" again.';
    assert.equal(injectConsts(content, constants), expected);
  });
});
